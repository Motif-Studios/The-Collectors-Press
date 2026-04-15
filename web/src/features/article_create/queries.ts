import { getStudioCreateArticleDataApi, saveStudioCreateArticleDraftApi, publishStudioCreateArticleApi } from "@/lib/api/studio_create_article";
import { getMockStudioCreateArticleData, saveMockStudioCreateArticleDraft, publishMockStudioCreateArticle } from "@/lib/api/mock/studio_create_article";

import { env } from "@/lib/env";
import type { StudioCreateArticle } from "./types";

export async function getStudioCreateArticleData() {
  if (env.useMockApi) {
    return getMockStudioCreateArticleData();
  }

  return getStudioCreateArticleDataApi();
}

export async function saveStudioCreateArticleDraft(article: StudioCreateArticle) {
  if (env.useMockApi) {
    return saveMockStudioCreateArticleDraft(article);
  }

  return saveStudioCreateArticleDraftApi(article);
}

export async function publishStudioCreateArticle(article: StudioCreateArticle) {
  if (env.useMockApi) {
    return publishMockStudioCreateArticle(article);
  }

  return publishStudioCreateArticleApi(article);
}