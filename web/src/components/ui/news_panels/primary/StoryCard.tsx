import React from "react";
import type { StoryCardItem } from "./types";

function classNameHelper(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

export type StoryCardProps = StoryCardItem & {
  className?: string;
};

export function StoryCard({
  kicker,
  title,
  summary,
  href,
  className,
}: StoryCardProps) {
  const content = (
    <>
      {kicker && <span className="block mb-2 text-[13px] font-bold text-[#5b83c4]">{kicker}</span>}

      <h2 className="mb-3 font-serif text-[28px] leading-[1.02] wrap-break-word font-bold tracking-[-0.4px] text-[#111]">
        {title}
      </h2>

      {summary && (
        <p className="font-serif text-[18px] leading-[1.35] text-[#6c6c6c]">
          {summary}
        </p>
      )}
    </>
  );

  return (
    <article
      className={classNameHelper(
        "border-b border-[#d6d6d6] pt-1.5 pb-6.5 last:border-b-0 last:mb-0 last:pb-0",
        className
      )}
    >
      {href ? (
        <a href={href} className="block no-underline">
          {content}
        </a>
      ) : (
        content
      )}
    </article>
  );
}