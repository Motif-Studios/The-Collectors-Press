import { getHomePageDataNormalised } from "@/lib/api/home";
import {
  approveAdminArticleApi,
  assignAdminArticleToPanelApi,
  getAdminPublishedArticlesApi,
  getAdminQueuedArticlesApi,
  removeAdminArticleFromPanelApi,
} from "@/lib/api/admin_dashboard";
import type { AdminDashboardData, AdminPanelName } from "./types";

export async function getAdminDashboardData(): Promise<AdminDashboardData> {
  const [queuedArticles, publishedArticles, homePage] = await Promise.all([
    getAdminQueuedArticlesApi(),
    getAdminPublishedArticlesApi(),
    getHomePageDataNormalised(),
  ]);

  return {
    queuedArticles,
    publishedArticles,
    homePage,
  };
}

export async function approveAdminArticle(articleId: string) {
  return approveAdminArticleApi(articleId);
}

export async function assignAdminArticleToPanel(panelName: AdminPanelName, articleId: string) {
  return assignAdminArticleToPanelApi(panelName, articleId);
}

export async function removeAdminArticleFromPanel(panelName: AdminPanelName, articleId: string) {
  return removeAdminArticleFromPanelApi(panelName, articleId);
}
