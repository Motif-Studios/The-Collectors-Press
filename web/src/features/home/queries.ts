import { getHomePageDataApi } from "@/lib/api/home";
import { getMockHomePageData } from "@/lib/api/mock/home";
import { env } from "@/lib/env";


export async function getHomePageData() {
  if (env.useMockApi) {
    return getMockHomePageData();
  }

  return getHomePageDataApi();
}