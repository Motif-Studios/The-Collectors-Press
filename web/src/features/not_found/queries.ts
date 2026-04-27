import { getNotFoundPageDataApi } from "@/lib/api/not_found";
import { getMockNotFoundPageData } from "@/lib/api/mock/not_found";
import { env } from "@/lib/env";


export async function getNotFoundPageData() {
  if (env.useMockApi) {
    return getMockNotFoundPageData();
  }

  return getNotFoundPageDataApi();
}