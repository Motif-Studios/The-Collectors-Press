import React from "react";
import Image from "next/image";
import { classNameHelper } from "@/lib/utils/classNameHelper";

export type ArticleAuthorSectionProps = {
  authorName: string;
  authorDescription: React.ReactNode;
  authorPhoto: string;
  moreTopics: string[];
  className?: string;
};

export function ArticleAuthorSection({
  authorName,
  authorDescription,
  authorPhoto,
  moreTopics,
  className,
}: ArticleAuthorSectionProps) {
  return (
    <section className={className}>
      <div className="mb-5 border-b border-[#333333] pb-2.5">
        <h2 className="font-serif text-[24px] font-bold uppercase tracking-[1px] sm:text-[20px]">
          ABOUT THE AUTHOR
        </h2>
      </div>

      <div className="flex items-start gap-4 sm:gap-4.5">
        <Image
          src={authorPhoto}
          alt={authorName}
          width={54}
          height={54}
          className="shrink-0 rounded-full object-cover"
        />

        <div className="max-w-135">
          <h3 className="mb-1.5 font-serif text-[18px] font-bold">
            {authorName}
          </h3>

          <div className="font-serif text-[16px] leading-[1.6] text-[#111] [&_a]:text-black [&_a]:underline [&_a]:underline-offset-2">
            {authorDescription}
          </div>
        </div>
      </div>

      <div className="my-10 h-px w-25 bg-[#999]" />

      <div>
        <p className="mb-2 font-serif text-[18px] font-bold">
          Explore More Topics
        </p>

        <p className="font-serif text-[16px] leading-[1.6]">
          {moreTopics.map((topic, index) => (
            <React.Fragment key={topic}>
              <a
                href="#"
                className="text-black underline underline-offset-2"
              >
                {topic}
              </a>
              {index < moreTopics.length - 1 ? ", " : null}
            </React.Fragment>
          ))}
        </p>
      </div>
    </section>
  );
}