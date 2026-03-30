import { getMockSearchPageData } from "./mock/search";

export async function getSearchPageDataApi(searchQuery: string) {
  // TEMP: until backend is ready
  console.log("API CALL");
  return getMockSearchPageData(searchQuery);
}