import { getCategoryPageDataApi } from "@/lib/api/category";
import { getMockCategoryPageData } from "@/lib/api/mock/category";
import { env } from "@/lib/env";

export async function getCategoryArticles(
  categorySlug: string,
  limit = 10,
  offset = 0,
  search?: string,
  sort?: string
) {
  if (env.useMockApi) {
    return getMockCategoryPageData(categorySlug, limit, offset);
  }

  return getCategoryPageDataApi(categorySlug, limit, offset, search, sort);
}