import { API_BASE_URL_SERVER } from "@/lib/env";

export async function getArticlePreviewDataApi(articleId: string) {
  try {
    const response = await fetch(`${API_BASE_URL_SERVER}/articles/${articleId}`);
    if (!response.ok) {
      console.error("Failed to fetch article preview:", response.status);
      return null;
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching article preview:", error);
    return null;
  }
}
