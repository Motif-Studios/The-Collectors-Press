import type { Article } from "./types";
import { getArticlePageDataApi, getArticleSecondaryPanelData } from "@/lib/api/article";
import { getMockArticleBySlug, getMockArticleSecondaryPanelData } from "@/lib/api/mock/article";
import { env } from "@/lib/env";

export async function getArticleBySlug(articleSlug: string): Promise<Article | null> {

  if (env.useMockApi) {
    return getMockArticleBySlug(articleSlug);
  }

  const article = await getArticlePageDataApi(articleSlug);
  return article?.error ? null : article;
}

export async function getArticlePageData(articleCategory: string) {
  if (env.useMockApi) {
    return getMockArticleSecondaryPanelData(articleCategory);
  }

  return getArticleSecondaryPanelData(articleCategory);
}