import { getMockArticleBySlug, getMockArticleSecondaryPanelData } from "./mock/article";
import { API_BASE_URL_SERVER } from "@/lib/env";
import { fetchWithTimeout } from "@/lib/fetchWithTimeout";

export async function getArticlePageDataApi(articleSlug: string) {
  try {
    const response = await fetchWithTimeout(`${API_BASE_URL_SERVER}/articles/slug/${encodeURIComponent(articleSlug)}`, { timeout: 5000 });

    const contentType = response?.headers?.get("content-type") ?? "";

    if (!contentType.includes("application/json")) {
      const body = await response.text();

      console.error("Error fetching article page data: non-JSON response", {
        status: response.status,
        contentType,
        preview: body.slice(0, 120),
      });

      return { error: "Failed to fetch article data" };
    }

    const data = await response.json();

    if (!response.ok || data?.error) {
      console.error("Error fetching article page data:", data?.error ?? response.statusText);
      return { error: "Failed to fetch article data" };
    }

    return data;
  } catch (error) {
    console.error("Error fetching article page data:", error);
    return { error: "Failed to fetch article data" };
  }
}

export async function getArticleSecondaryPanelData(articleCategory: string) {
  // TEMP: until backend is ready
  return getMockArticleSecondaryPanelData(articleCategory);
}