import React from "react";
import type { FeatureStoryItem } from "./types";
import Image from "next/image";

function classNameHelper(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

export type FeatureStoryCardProps = FeatureStoryItem & {
  className?: string;
};

export function FeatureStoryCard({
  imageSrc,
  imageAlt,
  type,
  section,
  title,
  summary,
  href,
  className,
}: FeatureStoryCardProps) {
  const content = (
    <>
      <div className="relative mb-3.5 h-82.5 w-full max-[600px]:h-55">
        <Image
          src={imageSrc}
          alt={imageAlt || title}
          fill
          className="bg-[#ddd] object-cover"
          sizes="(max-width: 600px) 100vw, 50vw"
          priority
        />
      </div>

      {(type || section) && (
        <div className="mb-2.5 flex flex-wrap items-center gap-2.5">
          {type && (
            <span className="text-[14px] font-bold text-[#111]">{type}</span>
          )}
          {section && (
            <span className="text-[14px] font-bold text-[#5b83c4]">
              {section}
            </span>
          )}
        </div>
      )}

      <h1 className="mb-4.5 max-w-[90%] font-serif text-[36px] leading-[0.98] font-bold tracking-[-0.6px] text-[#111] max-[900px]:max-w-full max-[900px]:text-[32px] max-[600px]:text-[28px] wrap-break-word">
        {title}
      </h1>

      {summary && (
        <p className="max-w-[92%] font-serif text-[18px] leading-[1.45] text-[#666] max-[900px]:max-w-full max-[600px]:text-[16px]">
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
