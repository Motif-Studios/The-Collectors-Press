import { getCurrentUser } from "@/features/auth/queries/getCurrentUser";
import { API_BASE_URL } from "@/lib/env";
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
  try {
    const user = await getCurrentUser();

    if (!user) {
      return [];
    }

    const articlePromises = articles.map(async (article) => ({
      id: article.article_id,
      title: article.title,
      slug: article.slug,
      status: article.status,
      category: await fetch(`${API_BASE_URL}/categories/article/${article.article_id}`).then(res => res.json()).then(data => data.category_name || "Uncategorized").catch(() => "Uncategorized"),
      updatedAtLabel: article.updated_at,
      authorName: user.name,
      secondaryActionLabel: article.status === "draft" ? "Preview" : "View",
    }));

    const normalisedArticles = await Promise.all(articlePromises);

    return normalisedArticles;
  } catch (error) {
    console.error("Error normalising dashboard articles:", error);
    return [];
  }
}

export async function getStudioDashboardSummary(articles: DashboardArticle[]): Promise<StudioDashboardSummary> {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return {
        totalArticles: 0,
        published: 0,
        drafts: 0,
        archived: 0,
      };
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
  } catch (error) {
    console.error("Error getting dashboard summary:", error);
    return {
      totalArticles: 0,
      published: 0,
      drafts: 0,
      archived: 0,
    };
  }
}

export async function getStudioDashboardDataApi(): Promise<StudioDashboardData> {
  // API calls needed:
  // StudioDashboardSummary data
  // StudioDashboardArticles data

  try {
    const user = await getCurrentUser();

    if (!user) {
      return {
        summary: { totalArticles: 0, published: 0, drafts: 0, archived: 0 },
        articles: [],
      };
    }

    const getUserArticles = await fetch(`${API_BASE_URL}/dashboard/articles/${user.id}`);

    if (!getUserArticles.ok) {
      console.error("Failed to fetch dashboard articles:", getUserArticles.status, getUserArticles.statusText);
      return {
        summary: { totalArticles: 0, published: 0, drafts: 0, archived: 0 },
        articles: [],
      };
    }

    const dashboardArticlesRaw = await getUserArticles.json();
    const dashboardArticles = Array.isArray(dashboardArticlesRaw)
      ? dashboardArticlesRaw
      : Array.isArray(dashboardArticlesRaw?.articles)
        ? dashboardArticlesRaw.articles
        : [];
    const normalisedArticles = await normalisedDashboardArticles(dashboardArticles);

    const dashboardSummary = await getStudioDashboardSummary(dashboardArticles);

    return {
      summary: dashboardSummary,
      articles: normalisedArticles,
    };
  } catch (error) {
    console.error("Error fetching studio dashboard data:", error);
    return {
      summary: { totalArticles: 0, published: 0, drafts: 0, archived: 0 },
      articles: [],
    };
  }
}