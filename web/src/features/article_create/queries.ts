import { getStudioCreateArticleDataApi, saveStudioCreateArticleDraftApi, publishStudioCreateArticleApi } from "@/lib/api/studio_create_article";
import { getMockStudioCreateArticleData, saveMockStudioCreateArticleDraft, publishMockStudioCreateArticle } from "@/lib/api/mock/studio_create_article";

import { env } from "@/lib/env";
import { API_BASE_URL_SERVER } from "@/lib/env";
import type { StudioCreateArticle } from "./types";

export async function getStudioCreateArticleData() {
  if (env.useMockApi) {
    return getMockStudioCreateArticleData();
  }

  return getStudioCreateArticleDataApi();
}

export async function getStudioCreateArticleById(articleId: string) {
  if (env.useMockApi) {
    const mockData = await getMockStudioCreateArticleData();
    return {
      ...mockData.article,
      article_id: articleId,
      id: articleId,
    };
  }

  const response = await fetch(`${API_BASE_URL_SERVER}/articles/${articleId}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch article");
  }

  return response.json();
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

export async function submitArticleForReview(articleId: string) {
  const response = await fetch(`${API_BASE_URL_SERVER}/dashboard/submit_article/${articleId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Failed to submit article: ${response.status} ${errorBody}`);
  }

  return response.json();
}

export async function publishArticle(articleId: string) {
  return submitArticleForReview(articleId);
}