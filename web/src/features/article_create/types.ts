export type StudioCreateArticleStatus =
  | "draft"
  | "published";

export type StudioCreateArticleData = {
  authorName: string;
  categories: string[];
  article: {
    title: string;
    subtitle: string;
    selectedCategory: string;
    status: StudioCreateArticleStatus;
    lastSavedLabel: string;
    coverImageCaption: string;
  };
};