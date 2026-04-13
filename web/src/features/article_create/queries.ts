import { getStudioCreateArticleDataApi } from "@/lib/api/studio_create_article";
import { getMockStudioCreateArticleData } from "@/lib/api/mock/studio_create_article";
import { env } from "@/lib/env";

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

  const response = await fetch(`http://localhost:5001/articles/${articleId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch article");
  }

  return response.json();
}