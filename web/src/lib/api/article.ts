import { getMockArticleBySlug, getMockArticleSecondaryPanelData } from "./mock/article";
import { API_BASE_URL_SERVER } from "@/lib/env";

export async function getArticlePageDataApi(articleSlug: string) {
  try {
    const response = await fetch(`${API_BASE_URL_SERVER}/articles/slug/${encodeURIComponent(articleSlug)}`);

    const contentType = response.headers.get("content-type") ?? "";

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
  console.log("API CALL");
  return getMockArticleSecondaryPanelData(articleCategory);
}