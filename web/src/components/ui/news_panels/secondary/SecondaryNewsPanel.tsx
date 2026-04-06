import React from "react";
import { SecondaryTopStoryCard } from "./SecondaryTopStoryCard";
import { SecondaryTextStoryCard } from "./SecondaryTextStoryCard";
import { SecondaryMiniCard } from "./SecondaryMiniCard";
import type { SecondaryNewsPanelProps } from "./types";
import { Wrapper } from "@/components/layout/wrapper/Wrapper";
import { classNameHelper } from "@/lib/utils/classNameHelper";

export function SecondaryNewsPanel({
  topStories,
  stories,
  miniCards,
  className,
}: SecondaryNewsPanelProps) {
  return (
    <Wrapper>
      <section className={className}>
        <div className="grid grid-cols-2 gap-x-[18px] max-[900px]:grid-cols-1">
          <div className="border-t-0 pt-0 pr-[18px] pb-[28px] max-[900px]:pr-0">
            <SecondaryTopStoryCard {...topStories[0]} />
          </div>

          <div className="border-t-0 pt-0 pl-[18px] pb-[28px] max-[900px]:pl-0">
            <SecondaryTopStoryCard {...topStories[1]} />
          </div>

          {stories.map((story, index) => {
            const isLeft = index % 2 === 0;

            return (
              <div
                key={story.id}
                className={classNameHelper(
                  "border-t border-[#d7d7d7] pt-[12px] pb-[28px]",
                  isLeft
                    ? "pr-4.5 max-[900px]:pr-0"
                    : "pl-[18px] max-[900px]:pl-0",
                )}
              >
                <SecondaryTextStoryCard {...story} />
              </div>
            );
          })}
        </div>

        <div className="mt-3 grid grid-cols-4 gap-4.5 max-[900px]:grid-cols-2 max-[560px]:grid-cols-1">
          {miniCards.map((card) => (
            <SecondaryMiniCard key={card.id} {...card} />
          ))}
        </div>
      </section>
    </Wrapper>
  );
}
