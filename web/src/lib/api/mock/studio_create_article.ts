import type { StudioCreateArticleData } from "@/features/article_create/types";

const mockStudioCreateArticleData: StudioCreateArticleData = {
  authorName: "Kevin Wu",
  categories: ["News", "Opinion", "Culture", "Technology"],
  article: {
    title: "",
    subtitle: "",
    selectedCategory: "News",
    status: "draft",
    lastSavedLabel: "2 minutes ago",
    coverImageCaption: "",
  },
};

export async function getMockStudioCreateArticleData(): Promise<StudioCreateArticleData> {
  return mockStudioCreateArticleData;
}