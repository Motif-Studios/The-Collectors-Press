import React from "react";
import { CategoryRow } from "./CategoryRow";
import type { SecondaryTextStoryItem } from "./types";
import { classNameHelper } from "@/lib/utils/classNameHelper";

export type SecondaryTextStoryCardProps = SecondaryTextStoryItem & {
  className?: string;
};

export function SecondaryTextStoryCard({
  categories,
  title,
  summary,
  href,
  className,
}: SecondaryTextStoryCardProps) {
  const content = (
    <>
      <CategoryRow categories={categories} />

      <h2 className="mb-2.5 font-serif text-[25px] leading-[1.05] font-bold tracking-[-0.3px] text-[#111] max-[560px]:text-[21px]">
        {title}
      </h2>

      {summary && (
        <p className="font-serif text-[16px] leading-[1.45] text-[#6d6d6d] max-[560px]:text-[15px]">
          {summary}
        </p>
      )}
    </>
  );

  return (
    <article className={classNameHelper(className)}>
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