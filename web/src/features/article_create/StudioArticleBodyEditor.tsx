"use client";

import React from "react";
import type EditorJS from "@editorjs/editorjs";
import type { API, OutputData, ToolConstructable } from "@editorjs/editorjs";
import type { EditorJsContent } from "./types";

type StudioArticleBodyEditorProps = {
  initialData: EditorJsContent;
  onChange?: (data: EditorJsContent) => void;
};

export function StudioArticleBodyEditor({
  initialData,
  onChange,
}: StudioArticleBodyEditorProps) {
  const holderRef = React.useRef<HTMLDivElement | null>(null);
  const editorRef = React.useRef<EditorJS | null>(null);
  const onChangeRef = React.useRef(onChange);

  React.useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  React.useEffect(() => {
    let destroyed = false;

    async function initEditor() {
      if (!holderRef.current || editorRef.current) return;

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

      const safeData: OutputData = {
        time: initialData?.time,
        version: initialData?.version,
        blocks:
          Array.isArray(initialData?.blocks) && initialData.blocks.length > 0
            ? initialData.blocks
            : [
                {
                  type: "paragraph",
                  data: {
                    text: "",
                  },
                },
              ],
      };

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
                  // const formData = new FormData();
                  // formData.append("file", file);

                  // const response = await fetch("/api/uploads/image", {
                  //   method: "POST",
                  //   body: formData,
                  // });

                  // if (!response.ok) {
                  //   throw new Error("Image upload failed");
                  // }

                  // const result = await response.json();

                  // return {
                  //   success: 1,
                  //   file: {
                  //     url: result.url,
                  //   },
                  // };

                  console.log("mock uploaded file:", file);

                  return {
                    success: 1,
                    file: {
                      url: "https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=1400&q=80",
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
            onChangeRef.current?.(output as EditorJsContent);
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
      }
    }

    initEditor();

    return () => {
      destroyed = true;

      if (editorRef.current) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, []);

  return <div ref={holderRef} />;
}
