import {
  getMockStudioCreateArticleData,
  saveMockStudioCreateArticleDraft,
  publishMockStudioCreateArticle,
} from "@/lib/api/mock/studio_create_article";

import type { StudioCreateArticle } from "@/features/article_create/types";

export async function getStudioCreateArticleDataApi() {
  console.log("API CALL: getStudioCreateArticleData");
  return getMockStudioCreateArticleData();
}

export async function saveStudioCreateArticleDraftApi(
  article: StudioCreateArticle
) {
  console.log("API CALL: saveStudioCreateArticleDraft");
  return saveMockStudioCreateArticleDraft(article);
}

export async function publishStudioCreateArticleApi(
  article: StudioCreateArticle
) {
  console.log("API CALL: publishStudioCreateArticle");
  return publishMockStudioCreateArticle(article);
}