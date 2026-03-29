import React from "react";
import Image from "next/image";
import { CategoryRow } from "./CategoryRow";
import type { SecondaryTopStoryItem } from "./types";

function classNameHelper(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

export type SecondaryTopStoryCardProps = SecondaryTopStoryItem & {
  className?: string;
};

export function SecondaryTopStoryCard({
  categories,
  title,
  summary,
  href,
  imageSrc,
  imageAlt,
  className,
}: SecondaryTopStoryCardProps) {
  const content = (
    <>
      <CategoryRow categories={categories} />

      <div className="grid grid-cols-[1.5fr_136px] gap-3.5 items-start max-[560px]:grid-cols-1">
        <div>
          <h2 className="mb-2.5 font-serif text-[25px] leading-[1.05] font-bold tracking-[-0.3px] text-[#111] max-[560px]:text-[21px]">
            {title}
          </h2>

          {summary && (
            <p className="font-serif text-[16px] leading-[1.45] text-[#6d6d6d] max-[560px]:text-[15px]">
              {summary}
            </p>
          )}
        </div>

        {imageSrc && (
          <div className="relative h-19 w-full bg-[#ddd] max-[560px]:h-45">
            <Image
              src={imageSrc}
              alt={imageAlt || title}
              fill
              className="object-cover"
              sizes="(max-width: 560px) 100vw, 136px"
            />
          </div>
        )}
      </div>
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