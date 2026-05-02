import { API_BASE_URL } from "@/lib/env";

export async function getCategoryPageDataApi(categorySlug: string, limit = 10, offset = 0) {
  // TEMP: until backend is ready
  // console.log("API CALL");

  try {
    const response = await fetch(`${API_BASE_URL}/articles/category/${categorySlug}/${limit}/${offset}`);

    if (!response.ok) {
      console.error("Failed to fetch category articles:", response.status, response.statusText);
      return [];
    }

    const data = await response.json();
    return Array.isArray(data) ? data : Array.isArray(data?.articles) ? data.articles : [];
  } catch (error) {
    console.error("Error fetching category page data:", error);
    return [];
  }
}