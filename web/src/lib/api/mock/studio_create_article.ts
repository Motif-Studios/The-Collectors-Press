import type { StudioCreateArticleData } from "@/features/article_create/types";
import type { StudioCreateArticle } from "@/features/article_create/types";

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

export async function saveMockStudioCreateArticleDraft(article: StudioCreateArticle): Promise<StudioCreateArticle> {
  console.log("SAVE DRAFT:", article);

  return {
    ...article,
    id: "342sfsoi5423sfjo",
    lastSavedLabel: "Just now",
  };
}

export async function publishMockStudioCreateArticle(article: StudioCreateArticle): Promise<StudioCreateArticle> {
  console.log("PUBLISH:", article);

  return {
    ...article,
    id: "342sfsoi5423sfjo",
    status: "published",
    lastSavedLabel: "Published just now",
  };
}
