import { getMockArticleBySlug, getMockArticleSecondaryPanelData } from "./mock/article";
import { API_BASE_URL } from "@/lib/env";

export async function getArticlePageDataApi(articleSlug: string) {
  const data = await fetch(`${API_BASE_URL}/article/${encodeURIComponent(articleSlug)}`)

    const response = await data.json();

    if (response.error) {
        console.error("Error fetching article page data:", response.error);
        return { error: "Failed to fetch article data" };
    }

    return data;
}

export async function getArticleSecondaryPanelData(articleCategory: string) {
  // TEMP: until backend is ready
  console.log("API CALL");
  return getMockArticleSecondaryPanelData(articleCategory);
}