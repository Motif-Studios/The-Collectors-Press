import {
  getMockStudioCreateArticleData,
  saveMockStudioCreateArticleDraft,
  publishMockStudioCreateArticle,
} from "@/lib/api/mock/studio_create_article";

import type { StudioCreateArticle } from "@/features/article_create/types";

export async function getStudioCreateArticleDataApi() {
  return getMockStudioCreateArticleData();
}

export async function saveStudioCreateArticleDraftApi(
  article: StudioCreateArticle
) {
  return saveMockStudioCreateArticleDraft(article);
}

export async function publishStudioCreateArticleApi(
  article: StudioCreateArticle
) {
  return publishMockStudioCreateArticle(article);
}