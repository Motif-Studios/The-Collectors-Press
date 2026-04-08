import type { StudioCreateArticleData } from "@/features/article_create/types";

const mockStudioCreateArticleData: StudioCreateArticleData = {
  authorName: "Kevin Wu",
  categories: ["News", "Opinion", "Culture", "Technology"],
  article: {
    title: "",
    subtitle: "",
    category: "News",
    status: "draft",
    lastSavedLabel: "2 minutes ago",
    coverImageCaption: "",
    body: {
      time: Date.now(),
      version: "2.30.0",
      blocks: [
        {
          type: "paragraph",
          data: {
            text: "Start writing your story here...",
          },
        },
      ],
    },
  },
};

export async function getMockStudioCreateArticleData(): Promise<StudioCreateArticleData> {
  return mockStudioCreateArticleData;
}
