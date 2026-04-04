import { getMockSavedStoriesPageData } from "./mock/saved_stories";

export async function getSavedStoriesPageDataApi() {
  // TEMP: until backend is ready
  console.log("API CALL");
  return getMockSavedStoriesPageData();
}