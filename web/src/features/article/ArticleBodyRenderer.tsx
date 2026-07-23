import type { EditorJsContent, EditorJsListItem } from "./types";
import Image from "next/image";

type ArticleBodyRendererProps = {
  content?: EditorJsContent | null;
};

function normaliseListItem(item: unknown): EditorJsListItem {
  if (typeof item === "string") {
    return {
      content: item,
      items: [],
    };
  }

  if (item && typeof item === "object") {
    const candidate = item as {
      content?: unknown;
      text?: unknown;
      items?: unknown;
      meta?: unknown;
    };

    return {
      content: toHtmlString(candidate.content ?? candidate.text),
      meta: candidate.meta && typeof candidate.meta === "object" ? (candidate.meta as EditorJsListItem["meta"]) : undefined,
      items: Array.isArray(candidate.items) ? candidate.items.map(normaliseListItem) : [],
    };
  }

  return {
    content: "",
    items: [],
  };
}

function toHtmlString(value: unknown) {
  if (typeof value === "string") return value;
  if (value === null || value === undefined) return "";
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  if (typeof value === "object") {
    const maybe = value as { text?: unknown; html?: unknown; content?: unknown };
    if (typeof maybe.text === "string") return maybe.text;
    if (typeof maybe.html === "string") return maybe.html;
    if (typeof maybe.content === "string") return maybe.content;
  }
  return "";
}

function isHtmlEffectivelyEmpty(html: unknown) {
  const safeHtml = toHtmlString(html);
  const stripped = safeHtml
    .replace(/&nbsp;/g, " ")
    .replace(/<[^>]*>/g, "")
    .trim();

  return stripped.length === 0;
}

function classNameHelper(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function renderListItems(items: unknown[]) {
  return items.map((rawItem, index) => {
    const item = normaliseListItem(rawItem);
    const hasNestedItems = Array.isArray(item.items) && item.items.length > 0;
    const itemHtml = toHtmlString(item.content);

    return (
      <li
        key={`${itemHtml}-${index}`}
        className="mb-3 font-[Georgia,'Times_New_Roman',serif] text-[1.08rem] leading-[1.75] text-[#111]"
      >
        <span dangerouslySetInnerHTML={{ __html: itemHtml }} />

        {hasNestedItems ? (
          <ul className="mt-3 list-disc pl-6">
            {renderListItems(item.items)}
          </ul>
        ) : null}
      </li>
    );
  });
}

function ArticleListBlock({
  style,
  items,
}: {
  style: "ordered" | "unordered" | "checklist";
  items: unknown[];
}) {
  const normalisedItems = items.map(normaliseListItem);

  if (style === "ordered") {
    return <ol className="mt-7 list-decimal pl-6">{renderListItems(normalisedItems)}</ol>;
  }

  if (style === "checklist") {
    return (
      <ul className="mt-7 space-y-3 pl-0">
        {normalisedItems.map((item, index) => (
          <li key={`${item.content}-${index}`} className="flex items-start gap-3">
            <input
              type="checkbox"
              checked={Boolean(item.meta?.checked)}
              readOnly
              className="mt-1"
            />

            <div className="flex-1 font-[Georgia,'Times_New_Roman',serif] text-[1.08rem] leading-[1.75] text-[#111]">
              <span dangerouslySetInnerHTML={{ __html: item.content }} />

              {item.items.length > 0 ? (
                <ul className="mt-3 list-disc pl-6">
                  {renderListItems(item.items)}
                </ul>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    );
  }

  return <ul className="mt-7 list-disc pl-6">{renderListItems(normalisedItems)}</ul>;
}

export function ArticleBodyRenderer({ content }: ArticleBodyRendererProps) {
  const blocks = Array.isArray(content?.blocks) ? content.blocks : [];

  if (blocks.length === 0) {
    return <p className="text-sm text-neutral-600">Preview content is not available yet.</p>;
  }

  return (
    <div>
      {blocks.map((block, index) => {
        const key = block.id ?? `${block.type}-${index}`;

        switch (block.type) {
          case "paragraph": {
            const paragraphHtml = toHtmlString(block.data?.text);
            if (isHtmlEffectivelyEmpty(paragraphHtml)) {
              return null;
            }

            const firstParagraphIndex = blocks.findIndex(
              (block) =>
                block.type === "paragraph" &&
                block.data?.text &&
                !isHtmlEffectivelyEmpty(block.data.text)
            );

            const isLeadParagraph = index === firstParagraphIndex;

            return (
              <p
                key={key}
                className={classNameHelper(
                  "font-[Georgia,'Times_New_Roman',serif] text-[1.08rem] leading-[1.75] text-[#111]",
                  "[&+p]:mt-7 [&+figure]:mt-7 [&+h2]:mt-11 [&+h3]:mt-9 [&+blockquote]:mt-9 [&+hr]:mt-9 [&+ul]:mt-7 [&+ol]:mt-7",
                  isLeadParagraph &&
                    "first-letter:float-left first-letter:pr-[10px] first-letter:pt-[3px] first-letter:text-[5.2rem] first-letter:leading-[0.82] first-letter:font-bold"
                )}
                dangerouslySetInnerHTML={{ __html: paragraphHtml }}
              />
            );
          }

          case "header": {
            const headerHtml = toHtmlString(block.data?.text);
            if (isHtmlEffectivelyEmpty(headerHtml)) {
              return null;
            }

            if (block.data.level === 2) {
              return (
                <h2
                  key={key}
                  className="mb-[18px] mt-11 font-[Georgia,'Times_New_Roman',serif] text-[2rem] leading-[1.15] font-medium text-[#111] md:text-[2.15rem]"
                  dangerouslySetInnerHTML={{ __html: headerHtml }}
                />
              );
            }

            if (block.data.level === 3) {
              return (
                <h3
                  key={key}
                  className="mb-4 mt-9 font-[Georgia,'Times_New_Roman',serif] text-[1.55rem] leading-[1.2] font-medium text-[#111]"
                  dangerouslySetInnerHTML={{ __html: headerHtml }}
                />
              );
            }

            return (
              <h4
                key={key}
                className="mb-3 mt-8 font-[Georgia,'Times_New_Roman',serif] text-[1.2rem] leading-[1.25] font-semibold text-[#111]"
                dangerouslySetInnerHTML={{ __html: headerHtml }}
              />
            );
          }

          case "image": {
            const imageUrl = toHtmlString(block.data?.file?.url);
            if (!imageUrl) return null;

            return (
              <figure key={key} className="my-[34px]">
                <div
                  className={classNameHelper(
                    "overflow-hidden bg-[#ddd]",
                    block.data?.withBorder && "border border-neutral-300",
                    block.data?.withBackground && "bg-neutral-100 p-4"
                  )}
                >
                  <Image
                    src={imageUrl}
                    alt={toHtmlString(block.data?.caption) || "Article image"}
                    width={1200}
                    height={700}
                    className={classNameHelper(
                      "block w-full object-cover",
                      !block.data?.stretched && "mx-auto max-w-[700px]"
                    )}
                  />
                </div>

                {toHtmlString(block.data?.caption) ? (
                  <figcaption className="mt-2 font-sans text-[11px] font-semibold tracking-[0.3px] text-[#6f7690]">
                    {toHtmlString(block.data?.caption)}
                  </figcaption>
                ) : null}
              </figure>
            );
          }

          case "list":
            return (
              <ArticleListBlock
                key={key}
                style={block.data?.style ?? "unordered"}
                items={Array.isArray(block.data?.items) ? block.data.items : []}
              />
            );

          case "quote":
            if (isHtmlEffectivelyEmpty(block.data?.text)) return null;
            return (
              <figure
                key={key}
                className="my-[38px] border-l-[3px] border-[#111] pl-[22px]"
              >
                <blockquote
                  className="font-[Georgia,'Times_New_Roman',serif] text-[1.9rem] leading-[1.45] italic text-[#111]"
                  dangerouslySetInnerHTML={{ __html: toHtmlString(block.data?.text) }}
                />

                {toHtmlString(block.data?.caption) ? (
                  <figcaption className="mt-3 font-sans text-[11px] font-bold uppercase tracking-[1.1px] text-[#666]">
                    {toHtmlString(block.data?.caption)}
                  </figcaption>
                ) : null}
              </figure>
            );

          case "delimiter":
            return <hr key={key} className="my-10 border-neutral-300" />;

          case "embed": {
            const src = toHtmlString(block.data?.embed ?? block.data?.source);

            if (!src) return null;

            return (
              <figure key={key} className="my-[38px]">
                <div className="relative w-full overflow-hidden bg-black aspect-video">
                  <iframe
                    src={src}
                    width={block.data?.width ?? 580}
                    height={block.data?.height ?? 320}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="block h-full w-full border-0"
                    title={toHtmlString(block.data?.caption) || "Embedded content"}
                  />
                </div>

                {toHtmlString(block.data?.caption) ? (
                  <figcaption className="mt-2 font-sans text-[11px] font-semibold tracking-[0.3px] text-[#6f7690]">
                    {toHtmlString(block.data?.caption)}
                  </figcaption>
                ) : null}
              </figure>
            );
          }

          default:
            return null;
        }
      })}
    </div>
  );
}