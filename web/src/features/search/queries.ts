import type { SearchPageData } from "./types";
import { getSearchPageDataApi } from "@/lib/api/search";
import { getMockSearchPageData } from "@/lib/api/mock/search";
import { env } from "@/lib/env";

export async function getSearchArticles(
  searchQuery: string,
): Promise<SearchPageData> {
  if (env.useMockApi) {
    return getMockSearchPageData(searchQuery);
  }

  return getSearchPageDataApi(searchQuery);
}
