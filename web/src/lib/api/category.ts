import { API_BASE_URL } from "@/lib/env";

export async function getCategoryPageDataApi(categorySlug: string, limit = 10, offset = 0) {
  // TEMP: until backend is ready
  // console.log("API CALL");

  const response = await fetch(`${API_BASE_URL}/articles/category/${categorySlug}/${limit}/${offset}`);

  if (!response.ok) {
    throw new Error("Failed to fetch category articles");
  }

  return response.json();
}