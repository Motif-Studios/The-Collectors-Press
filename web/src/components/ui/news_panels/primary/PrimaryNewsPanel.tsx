import React from "react";
import { StoryCard } from "./StoryCard";
import { FeatureStoryCard } from "./FeatureStoryCard";
import type { PrimaryNewsPanelProps } from "./types";
import { Wrapper } from "@/components/layout/wrapper/Wrapper";

export function PrimaryNewsPanel({
  feature,
  stories,
  className,
}: PrimaryNewsPanelProps) {
  return (
    <section className={className}>
      <Wrapper>
        <div className="grid grid-cols-[1fr_1.25fr] items-start gap-9.5 max-[900px]:grid-cols-1 max-[900px]:gap-7">
          <aside className="border-r border-[#d9d9d9] pr-9.5 max-[900px]:border-r-0 max-[900px]:border-b max-[900px]:pb-7 max-[900px]:pr-0">
            <div className="flex flex-col">
              {stories.map((story) => (
                <StoryCard key={story.id} {...story} />
              ))}
            </div>
          </aside>

          <FeatureStoryCard {...feature} />
        </div>
      </Wrapper>
    </section>
  );
}
