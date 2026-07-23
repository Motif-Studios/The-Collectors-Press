import React from "react";
import Image from "next/image";
import Link from "next/link";
import { classNameHelper } from "@/lib/utils/classNameHelper";

type TopicLink = string | { 
  title: string; 
  href?: string;
  imageSrc?: string;
  imageAlt?: string;
};

export type ArticleAuthorSectionProps = {
  authorName: string;
  authorDescription: React.ReactNode;
  authorPhoto: string;
  moreTopics: TopicLink[];
  className?: string;
};

export function ArticleAuthorSection({
  authorName,
  authorDescription,
  authorPhoto,
  moreTopics,
  className,
}: ArticleAuthorSectionProps) {
  // Check if any topic has images
  const hasImages = moreTopics.some(topic => 
    typeof topic !== 'string' && topic.imageSrc
  );

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

        {hasImages ? (
          // Grid layout for topics with images (like mini cards)
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {moreTopics.map((topic, index) => {
              if (typeof topic === 'string') {
                return (
                  <div key={`${topic}-${index}`} className="flex items-center">
                    <span className="text-black underline underline-offset-2 text-sm font-serif">
                      {topic}
                    </span>
                  </div>
                );
              }

              const content = (
                <div className="group cursor-pointer">
                  {topic.imageSrc && (
                    <div className="relative mb-2 h-32 w-full bg-[#ddd] overflow-hidden rounded">
                      <Image
                        src={topic.imageSrc}
                        alt={topic.imageAlt || topic.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                        sizes="(max-width: 560px) 50vw, (max-width: 900px) 33vw, 25vw"
                      />
                    </div>
                  )}
                  <h4 className="font-serif text-sm font-bold leading-tight text-[#111]">
                    {topic.title}
                  </h4>
                </div>
              );

              return (
                <div key={`${topic.title}-${index}`}>
                  {topic.href ? (
                    <Link href={topic.href} className="block no-underline">
                      {content}
                    </Link>
                  ) : (
                    content
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          // Inline text layout for topics without images
          <p className="font-serif text-[16px] leading-[1.6]">
            {moreTopics.map((topic, index) => (
              <React.Fragment key={`${typeof topic === "string" ? topic : topic.title}-${index}`}>
                {typeof topic === "string" ? (
                  <span className="text-black underline underline-offset-2">
                    {topic}
                  </span>
                ) : topic.href ? (
                  <Link href={topic.href} className="text-black underline underline-offset-2">
                    {topic.title}
                  </Link>
                ) : (
                  <span className="text-black underline underline-offset-2">
                    {topic.title}
                  </span>
                )}
                {index < moreTopics.length - 1 ? ", " : null}
              </React.Fragment>
            ))}
          </p>
        )}
      </div>
    </section>
  );
}