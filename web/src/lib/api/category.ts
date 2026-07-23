import { API_BASE_URL_SERVER } from "@/lib/env";

export async function getCategoryPageDataApi(
  categorySlug: string,
  limit = 10,
  offset = 0,
  search?: string,
  sort?: string
) {
  try {
    const url = new URL(`${API_BASE_URL_SERVER}/articles/category/${encodeURIComponent(categorySlug)}/${limit}/${offset}`);
    if (search) url.searchParams.set("search", search);
    if (sort) url.searchParams.set("sort", sort);

    const response = await fetch(url.toString());

    if (!response.ok) {
      console.error("Failed to fetch category articles:", response.status, response.statusText);
      return { articles: [], total: 0 };
    }

    const data = await response.json();
    if (data && typeof data === "object" && "articles" in data) {
      return data as { articles: unknown[]; total: number };
    }
    // Fallback: backend returned plain array (old shape)
    return { articles: Array.isArray(data) ? data : [], total: 0 };
  } catch (error) {
    console.error("Error fetching category page data:", error);
    return { articles: [], total: 0 };
  }
}