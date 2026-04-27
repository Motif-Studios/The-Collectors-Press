import { getCurrentUser } from "@/features/auth/queries/getCurrentUser";
import type {
  StudioArticleRow,
  StudioDashboardData,
  StudioDashboardSummary,
} from "@/features/dashboard/types";

type DashboardArticle = {
  article_id: string;
  author_id: string;
  title: string;
  preview_text: string;
  description: string;
  content: Record<string, unknown>;
  is_premium: boolean;
  created_at: string;
  updated_at: string;
  cover_image_url: string;
  slug: string;
  image_alt: string;
  status: string;
};

export async function normalisedDashboardArticles(articles: DashboardArticle[]): Promise<StudioArticleRow[]> {
    const user = await getCurrentUser();

    if (!user) {
        throw new Error("User not authenticated");
    }

    const articlePromises = articles.map(async (article) => ({
        id: article.article_id,
        title: article.title,
        slug: article.slug,
        status: article.status,
        category: await fetch(`http://localhost:5001/categories/article/${article.article_id}`).then(res => res.json()).then(data => data.category_name || "Uncategorized"),
        updatedAtLabel: article.updated_at,
        authorName: user.name,
        secondaryActionLabel: article.status === "draft" ? "Preview" : "View",
    }));

    const normalisedArticles = await Promise.all(articlePromises);

    return normalisedArticles;
}

export async function getStudioDashboardSummary(articles: DashboardArticle[]): Promise<StudioDashboardSummary> {
    const user = await getCurrentUser();

    if (!user) {
        throw new Error("User not authenticated");
    }

    const articleArray = Array.isArray(articles) ? articles : [];

    const totalArticles = articleArray.length;
    const publishedArticles = articleArray.filter(article => article.status === "published").length;
    const draftArticles = articleArray.filter(article => article.status === "draft").length;
    const archivedArticles = articleArray.filter(article => article.status === "archived").length;

    return {
        totalArticles,
        published: publishedArticles,
        drafts: draftArticles,
        archived: archivedArticles,
    };
}

export async function getStudioDashboardDataApi(): Promise<StudioDashboardData> {
  // API calls needed:
  // StudioDashboardSummary data
  // StudioDashboardArticles data

  const user = await getCurrentUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  const getUserArticles = await fetch(`http://localhost:5001/dashboard/articles/${user.id}`);

  if (!getUserArticles.ok) {
    throw new Error("Failed to fetch dashboard articles");
  }

  const dashboardArticlesRaw = await getUserArticles.json();
  const dashboardArticles = Array.isArray(dashboardArticlesRaw)
    ? dashboardArticlesRaw
    : Array.isArray(dashboardArticlesRaw?.articles)
      ? dashboardArticlesRaw.articles
      : [];
  const normalisedArticles = await normalisedDashboardArticles(dashboardArticles);

  const dashboardSummary = await getStudioDashboardSummary(dashboardArticles);

  return{
    summary: dashboardSummary,
    articles: normalisedArticles,
  }
}