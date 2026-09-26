import Link from "next/link";
import { getHomePageData } from "./queries";
import { PrimaryNewsPanel } from "@/components/ui/news_panels/primary";
import { SecondaryNewsPanel } from "@/components/ui/news_panels/secondary";
import type { SecondaryTopStoryItem } from "@/components/ui/news_panels/secondary";
import { Wrapper } from "@/components/layout/wrapper/Wrapper";

export async function HomePageView() {
  const data = await getHomePageData();
  const { primaryPanel, secondaryPanel } = data;

  // The API returned nothing (usually timed out) - say so rather than rendering empty panels
  if (!primaryPanel.feature.id && secondaryPanel.miniCards.length === 0) {
    return (
      <Wrapper className="my-24 text-center">
        <h2 className="text-2xl font-bold tracking-tight text-black">Stories are on their way</h2>
        <p className="mt-2 text-sm text-gray-500">
          We couldn&apos;t load the latest stories just now. Please refresh in a moment.
        </p>
        <Link
          href="/"
          prefetch={false}
          className="mt-6 inline-flex h-11 items-center justify-center bg-[#3fa0cf] px-6 text-[15px] font-bold text-white transition hover:bg-[#3495c3]"
        >
          Refresh
        </Link>
      </Wrapper>
    );
  }

  return (
    <div className="my-16 flex flex-col gap-12">
      <PrimaryNewsPanel feature={primaryPanel.feature} stories={primaryPanel.stories} />
      <SecondaryNewsPanel topStories={secondaryPanel.topStories as [SecondaryTopStoryItem, SecondaryTopStoryItem]} stories={secondaryPanel.stories} miniCards={secondaryPanel.miniCards} />
    </div>
  );
}
