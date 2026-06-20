import { getHomePageDataNormalised } from "@/lib/api/home";


export async function getHomePageData() {
  // if (env.useMockApi) {
  //   return getMockHomePageData();
  // }

  return getHomePageDataNormalised();
}