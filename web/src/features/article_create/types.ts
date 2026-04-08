export type StudioCreateArticleStatus = "draft" | "published";

export type EditorJsBlock = {
  id?: string;
  type: string;
  data: Record<string, unknown>;
};

export type EditorJsContent = {
  time?: number;
  blocks: EditorJsBlock[];
  version?: string;
};

export type StudioCreateArticle = {
  title: string;
  subtitle: string;
  category: string;
  status: StudioCreateArticleStatus;
  lastSavedLabel: string;
  coverImageCaption: string;
  body: EditorJsContent;
};

export type StudioCreateArticleData = {
  authorName: string;
  categories: string[];
  article: StudioCreateArticle;
};