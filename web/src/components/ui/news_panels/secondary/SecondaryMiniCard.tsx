import React from "react";
import Image from "next/image";
import type { SecondaryMiniCardItem } from "./types";

function classNameHelper(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

export type SecondaryMiniCardProps = SecondaryMiniCardItem & {
  className?: string;
};

export function SecondaryMiniCard({
  category,
  title,
  href,
  imageSrc,
  imageAlt,
  className,
}: SecondaryMiniCardProps) {
  const content = (
    <>
      {imageSrc && (
        <div className="relative mb-2.5 h-37.5 w-full bg-[#ddd]">
          <Image
            src={imageSrc}
            alt={imageAlt || title}
            fill
            className="object-cover"
            sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 25vw"
          />
        </div>
      )}

      {category && (
        <div className="mb-2 text-[12px] font-bold text-[#6b90d6]">
          {category}
        </div>
      )}

      <h3 className="font-serif text-[24px] leading-[1.06] font-bold tracking-[-0.3px] text-[#111] max-[560px]:text-[21px]">
        {title}
      </h3>
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