import type { EditorJsContent, EditorJsListItem } from "./types";
import Image from "next/image";

type ArticleBodyRendererProps = {
  content?: EditorJsContent | null;
};

function isHtmlEffectivelyEmpty(html: string) {
  const stripped = html
    .replace(/&nbsp;/g, " ")
    .replace(/<[^>]*>/g, "")
    .trim();

  return stripped.length === 0;
}

function classNameHelper(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function renderListItems(items: EditorJsListItem[]) {
  return items.map((item, index) => {
    const hasNestedItems = item.items.length > 0;

    return (
      <li
        key={`${item.content}-${index}`}
        className="mb-3 font-[Georgia,'Times_New_Roman',serif] text-[1.08rem] leading-[1.75] text-[#111]"
      >
        <span dangerouslySetInnerHTML={{ __html: item.content }} />

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
  items: EditorJsListItem[];
}) {
  if (style === "ordered") {
    return <ol className="mt-7 list-decimal pl-6">{renderListItems(items)}</ol>;
  }

  if (style === "checklist") {
    return (
      <ul className="mt-7 space-y-3 pl-0">
        {items.map((item, index) => (
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

  return <ul className="mt-7 list-disc pl-6">{renderListItems(items)}</ul>;
}

export function ArticleBodyRenderer({ content }: ArticleBodyRendererProps) {
  const blocks = Array.isArray(content?.blocks) ? content.blocks : [];

  console.log("🎨 ArticleBodyRenderer received:", {
    contentExists: !!content,
    blocksCount: blocks.length,
    blockTypes: blocks.map(b => b.type),
  });

  if (blocks.length === 0) {
    console.warn("⚠️ No blocks to render");
    return null;
  }

  return (
    <div>
      {blocks.map((block, index) => {
        const key = block.id ?? `${block.type}-${index}`;

        switch (block.type) {
          case "paragraph": {
            if (isHtmlEffectivelyEmpty(block.data.text)) {
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
                dangerouslySetInnerHTML={{ __html: block.data.text }}
              />
            );
          }

          case "header": {
            if (block.data.level === 2) {
              return (
                <h2
                  key={key}
                  className="mb-[18px] mt-11 font-[Georgia,'Times_New_Roman',serif] text-[2rem] leading-[1.15] font-medium text-[#111] md:text-[2.15rem]"
                  dangerouslySetInnerHTML={{ __html: block.data.text }}
                />
              );
            }

            if (block.data.level === 3) {
              return (
                <h3
                  key={key}
                  className="mb-4 mt-9 font-[Georgia,'Times_New_Roman',serif] text-[1.55rem] leading-[1.2] font-medium text-[#111]"
                  dangerouslySetInnerHTML={{ __html: block.data.text }}
                />
              );
            }

            return (
              <h4
                key={key}
                className="mb-3 mt-8 font-[Georgia,'Times_New_Roman',serif] text-[1.2rem] leading-[1.25] font-semibold text-[#111]"
                dangerouslySetInnerHTML={{ __html: block.data.text }}
              />
            );
          }

          case "image":
            return (
              <figure key={key} className="my-[34px]">
                <div
                  className={classNameHelper(
                    "overflow-hidden bg-[#ddd]",
                    block.data.withBorder && "border border-neutral-300",
                    block.data.withBackground && "bg-neutral-100 p-4"
                  )}
                >
                  <Image
                    src={block.data.file.url}
                    alt={block.data.caption || "Article image"}
                    width={1200}
                    height={700}
                    className={classNameHelper(
                      "block w-full object-cover",
                      !block.data.stretched && "mx-auto max-w-[700px]"
                    )}
                  />
                </div>

                {block.data.caption ? (
                  <figcaption className="mt-2 font-sans text-[11px] font-semibold tracking-[0.3px] text-[#6f7690]">
                    {block.data.caption}
                  </figcaption>
                ) : null}
              </figure>
            );

          case "list":
            return (
              <ArticleListBlock
                key={key}
                style={block.data.style}
                items={block.data.items}
              />
            );

          case "quote":
            return (
              <figure
                key={key}
                className="my-[38px] border-l-[3px] border-[#111] pl-[22px]"
              >
                <blockquote
                  className="font-[Georgia,'Times_New_Roman',serif] text-[1.9rem] leading-[1.45] italic text-[#111]"
                  dangerouslySetInnerHTML={{ __html: block.data.text }}
                />

                {block.data.caption ? (
                  <figcaption className="mt-3 font-sans text-[11px] font-bold uppercase tracking-[1.1px] text-[#666]">
                    {block.data.caption}
                  </figcaption>
                ) : null}
              </figure>
            );

          case "delimiter":
            return <hr key={key} className="my-10 border-neutral-300" />;

          case "embed":
            return (
              <figure key={key} className="my-[38px]">
                <div className="relative w-full overflow-hidden bg-black aspect-video">
                  <iframe
                    src={block.data.embed}
                    width={block.data.width ?? 580}
                    height={block.data.height ?? 320}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="block h-full w-full border-0"
                    title={block.data.caption || "Embedded content"}
                  />
                </div>

                {block.data.caption ? (
                  <figcaption className="mt-2 font-sans text-[11px] font-semibold tracking-[0.3px] text-[#6f7690]">
                    {block.data.caption}
                  </figcaption>
                ) : null}
              </figure>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}