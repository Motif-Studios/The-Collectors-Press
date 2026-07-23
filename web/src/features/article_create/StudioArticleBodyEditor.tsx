"use client";

import React from "react";
import type EditorJS from "@editorjs/editorjs";
import type { API, OutputData, ToolConstructable } from "@editorjs/editorjs";
import type { EditorJsContent } from "./types";
import { uploadFile } from "@/features/dashboard/queries/uploadFile";

type StudioArticleBodyEditorProps = {
  initialData: EditorJsContent;
  articleId?: string;
  onChange?: (data: EditorJsContent) => void;
};

export function StudioArticleBodyEditor({
  initialData,
  articleId,
  onChange,
}: StudioArticleBodyEditorProps) {
  const holderRef = React.useRef<HTMLDivElement | null>(null);
  const editorRef = React.useRef<EditorJS | null>(null);
  const onChangeRef = React.useRef(onChange);
  const articleIdRef = React.useRef(articleId);
  const initialisedRef = React.useRef(false);
  const emitTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  // Validate and sanitize editor data
  const validateAndSanitizeData = React.useCallback((data: OutputData): OutputData => {
    if (!Array.isArray(data.blocks)) {
      return {
        time: data.time || Date.now(),
        version: data.version || "2.30.0",
        blocks: [{
          type: "paragraph",
          data: { text: "" }
        }]
      };
    }

    const validatedBlocks = data.blocks
      .filter(block => block && typeof block === 'object')
      .map(block => {
        // Ensure block has required properties
        if (!block.type || typeof block.type !== 'string') {
          return null;
        }

        if (!block.data || typeof block.data !== 'object') {
          return null;
        }

        // Validate specific block types
        switch (block.type) {
          case 'paragraph':
            return {
              type: 'paragraph',
              data: {
                text: typeof block.data.text === 'string' ? block.data.text : ''
              }
            };
          case 'header':
            return {
              type: 'header',
              data: {
                text: typeof block.data.text === 'string' ? block.data.text : '',
                level: typeof block.data.level === 'number' ? block.data.level : 2
              }
            };
          case 'list':
            return {
              type: 'list',
              data: {
                style: ['ordered', 'unordered'].includes(block.data.style) ? block.data.style : 'unordered',
                items: Array.isArray(block.data.items) ? block.data.items.filter((item: unknown) => typeof item === 'string' || typeof item === 'object') : []
              }
            };
          case 'image':
            if (block.data.file && typeof block.data.file === 'object' && typeof block.data.file.url === 'string') {
              return {
                type: 'image',
                data: {
                  file: { url: block.data.file.url },
                  caption: typeof block.data.caption === 'string' ? block.data.caption : '',
                  withBorder: Boolean(block.data.withBorder),
                  withBackground: Boolean(block.data.withBackground),
                  stretched: Boolean(block.data.stretched)
                }
              };
            }
            return null;
          case 'quote':
            return {
              type: 'quote',
              data: {
                text: typeof block.data.text === 'string' ? block.data.text : '',
                caption: typeof block.data.caption === 'string' ? block.data.caption : '',
                alignment: ['left', 'center'].includes(block.data.alignment) ? block.data.alignment : 'left'
              }
            };
          case 'delimiter':
            return {
              type: 'delimiter',
              data: {}
            };
          case 'embed':
            if (block.data.source && block.data.embed) {
              return {
                type: 'embed',
                data: {
                  source: block.data.source,
                  embed: block.data.embed,
                  width: typeof block.data.width === 'number' ? block.data.width : 580,
                  height: typeof block.data.height === 'number' ? block.data.height : 320,
                  caption: typeof block.data.caption === 'string' ? block.data.caption : ''
                }
              };
            }
            return null;
          default:
            return block;
        }
      })
      .filter((block): block is typeof data.blocks[0] => block !== null);

    // Ensure at least one valid block
    if (validatedBlocks.length === 0) {
      validatedBlocks.push({
        type: 'paragraph',
        data: { text: '' }
      });
    }

    return {
      time: data.time || Date.now(),
      version: data.version || "2.30.0",
      blocks: validatedBlocks
    };
  }, []);

  const safeData = React.useMemo<OutputData>(() => 
    validateAndSanitizeData({
      time: initialData?.time,
      version: initialData?.version,
      blocks: Array.isArray(initialData?.blocks) && initialData.blocks.length > 0
        ? initialData.blocks
        : [{
            type: "paragraph",
            data: {
              text: "",
            },
          }],
    }), 
  [initialData, validateAndSanitizeData]);

  React.useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  React.useEffect(() => {
    articleIdRef.current = articleId;
  }, [articleId]);

  React.useEffect(() => {
    let destroyed = false;

    async function initEditor() {
      if (!holderRef.current || editorRef.current || initialisedRef.current) return;

      initialisedRef.current = true;

      const EditorJSModule = await import("@editorjs/editorjs");
      const HeaderModule = await import("@editorjs/header");
      const ListModule = await import("@editorjs/list");
      const QuoteModule = await import("@editorjs/quote");
      const DelimiterModule = await import("@editorjs/delimiter");
      const ImageToolModule = await import("@editorjs/image");
      const EmbedToolModule = await import("@editorjs/embed");

      const EditorJSClass = EditorJSModule.default;
      const Header = HeaderModule.default as unknown as ToolConstructable;
      const List = ListModule.default as unknown as ToolConstructable;
      const Quote = QuoteModule.default as unknown as ToolConstructable;
      const Delimiter = DelimiterModule.default as unknown as ToolConstructable;
      const ImageTool = ImageToolModule.default as unknown as ToolConstructable;
      const EmbedTool = EmbedToolModule.default as unknown as ToolConstructable;

      const editor = new EditorJSClass({
        holder: holderRef.current,
        autofocus: false,
        placeholder: "Start writing your article...",
        data: safeData,
        tools: {
          header: {
            class: Header,
            inlineToolbar: true,
            config: {
              placeholder: "Heading",
              levels: [2, 3, 4],
              defaultLevel: 2,
            },
          },
          list: {
            class: List,
            inlineToolbar: true,
          },
          quote: {
            class: Quote,
            inlineToolbar: true,
            config: {
              quotePlaceholder: "Enter a quote",
              captionPlaceholder: "Quote source",
            },
          },
          delimiter: {
            class: Delimiter,
          },
          image: {
            class: ImageTool,
            config: {
              uploader: {
                async uploadByFile(file: File) {
                  const currentArticleId = articleIdRef.current;

                  if (!currentArticleId) {
                    throw new Error("Article ID is not available yet");
                  }

                  const result = await uploadFile(file, currentArticleId);

                  return {
                    success: 1,
                    file: {
                      url: result.publicUrl || result.path,
                    },
                  };
                },
              },
            },
          },
          embed: {
            class: EmbedTool,
            inlineToolbar: true,
            config: {
              services: {
                youtube: true,
                vimeo: true,
              },
            },
          },
        },
        async onChange(api: API) {
          try {
            const output = await api.saver.save();
            if (emitTimeoutRef.current) {
              clearTimeout(emitTimeoutRef.current);
            }

            emitTimeoutRef.current = setTimeout(() => {
              onChangeRef.current?.(output as EditorJsContent);
            }, 250);
          } catch (error) {
            console.error("Failed to save editor content", error);
          }
        },
      });

      try {
        await editor.isReady;

        if (destroyed) {
          editor.destroy();
          return;
        }

        editorRef.current = editor;
      } catch (error) {
        console.error("Failed to initialize Editor.js", error);
        initialisedRef.current = false;
      }
    }

    initEditor();

    return () => {
      destroyed = true;

      if (editorRef.current) {
        const currentEditor = editorRef.current;
        editorRef.current = null;
        void currentEditor.isReady
          .then(() => currentEditor.destroy())
          .catch(() => undefined);
      }

      if (emitTimeoutRef.current) {
        clearTimeout(emitTimeoutRef.current);
        emitTimeoutRef.current = null;
      }

      initialisedRef.current = false;
    };
  }, []);

  return <div ref={holderRef} />;
}
