import { getMockCategoryPageData } from "./mock/category";

export async function getCategoryPageDataApi(categorySlug: string, limit = 10, offset = 0) {
  // TEMP: until backend is ready
  console.log("API CALL");
  return getMockCategoryPageData(categorySlug, limit, offset);
}