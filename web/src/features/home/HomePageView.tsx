import { getHomePageData } from "./queries";
import { PrimaryNewsPanel } from "@/components/ui/news_panels/primary";
import { SecondaryNewsPanel } from "@/components/ui/news_panels/secondary";

export async function HomePageView() {
  const data = await getHomePageData();
  const { primaryPanel, secondaryPanel } = data;

  return (
    <div className="my-16 flex flex-col gap-12">
      <PrimaryNewsPanel feature={primaryPanel.feature} stories={primaryPanel.stories} />
      <SecondaryNewsPanel topStories={secondaryPanel.topStories} stories={secondaryPanel.stories} miniCards={secondaryPanel.miniCards} />
    </div>
  );
}