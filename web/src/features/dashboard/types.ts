// export type ArticleStatus = "draft" | "published";

export type ArticleStatus = "draft" | "submitted" | "rejected" | "published" | "archived";

export type StudioArticleRow = {
  id: string;
  title: string;
  slug: string;
  status: ArticleStatus;
  category: string;
  updatedAtLabel: string;
  authorName: string;
  secondaryActionLabel: string;
};

export type StudioDashboardSummary = {
  totalArticles: number;
  drafts: number;
  submitted: number;
  rejected: number;
  published: number;
  archived: number;
};

export type StudioDashboardData = {
  summary: StudioDashboardSummary;
  articles: StudioArticleRow[];
};