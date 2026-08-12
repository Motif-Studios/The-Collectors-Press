import { API_BASE_URL_SERVER } from "@/lib/env";
import { fetchWithTimeout } from "@/lib/fetchWithTimeout";

export async function getArticlePreviewDataApi(articleId: string) {
  try {
    const response = await fetchWithTimeout(`${API_BASE_URL_SERVER}/articles/${articleId}`, { timeout: 5000 });
    if (!response || !response.ok) {
      console.error("Failed to fetch article preview:", response?.status);
      return null;
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching article preview:", error);
    return null;
  }
}
