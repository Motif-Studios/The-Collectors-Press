import { getSavedStoriesPageDataApi } from "@/lib/api/saved_stories";
import { getMockSavedStoriesPageData } from "@/lib/api/mock/saved_stories";
import { env } from "@/lib/env";

export async function getSavedStories() {
  if (env.useMockApi) {
    return getMockSavedStoriesPageData();
  }

  return getSavedStoriesPageDataApi();
}
