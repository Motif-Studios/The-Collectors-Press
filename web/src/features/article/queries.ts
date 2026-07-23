import type { Article } from "./types";
import { getArticleSecondaryPanelData } from "@/lib/api/article";
import { getMockArticleBySlug, getMockArticleSecondaryPanelData } from "@/lib/api/mock/article";
import { API_BASE_URL_SERVER, env } from "@/lib/env";
import { normaliseArticle } from "./normaliseArticle";

export async function getArticleBySlug(articleSlug: string): Promise<Article | null> {
  if (env.useMockApi) {
    return getMockArticleBySlug(articleSlug);
  }

  try {
    // const baseUrl = process.env.API_BASE_URL_SERVER ?? "https://thecollectorspress.com/";
    const response = await fetch(`${API_BASE_URL_SERVER}/articles/slug/${encodeURIComponent(articleSlug)}`);
    
        const contentType = response.headers.get("content-type") ?? "";
    
        if (!contentType.includes("application/json")) {
          const body = await response.text();
    
          console.error("Error fetching article page data: non-JSON response", {
            status: response.status,
            contentType,
            preview: body.slice(0, 120),
          });
    
          return null;
        }
    
        const data = await response.json();
    
        if (!response.ok || data?.error || !data) {
          console.error("Error fetching article page data:", data?.error ?? response.statusText);
          return null;
        }

        return normaliseArticle(data as Article & Record<string, unknown>);
      } catch (error) {
        console.error("Error fetching article page data:", error);
        return null;
      }
}

export async function getArticlePageData(articleCategory: string) {
  if (env.useMockApi) {
    return getMockArticleSecondaryPanelData(articleCategory);
  }

  return getArticleSecondaryPanelData(articleCategory);
}