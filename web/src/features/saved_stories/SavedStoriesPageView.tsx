import { Panel, PanelBody, PanelFooter } from "@/components/ui/panel/Panel";
import { SavedStoryCard } from "@/components/ui/saved_stories_card/SavedStoryCard";
import { getSavedStories } from "./queries";

export async function SavedStoriesPageView() {
  const savedStories = await getSavedStories();
  return (
    <div>
      <div className="w-165 max-w-full">
        <Panel>
          <PanelBody>
            <h2>Saved Stories</h2>

            <p>View your collection across the app and website.</p>
          </PanelBody>

          <PanelFooter className="flex flex-col gap-6">
            {savedStories.map((story) => (
              <SavedStoryCard
                key={story.id}
                title={story.title}
                author={story.author}
                image={story.imageSrc}
                imageAlt={story.imageAlt}
                href={story.href}
              />
            ))}
          </PanelFooter>
        </Panel>
      </div>
    </div>
  );
}
