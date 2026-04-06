import { getStudioCreateArticleDataApi } from "@/lib/api/studio_create_article";
import { getMockStudioCreateArticleData } from "@/lib/api/mock/studio_create_article";
import { env } from "@/lib/env";

export async function getStudioCreateArticleData() {
  if (env.useMockApi) {
    return getMockStudioCreateArticleData();
  }

  return getStudioCreateArticleDataApi();
}