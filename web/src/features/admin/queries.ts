import { getHomePageDataNormalised } from "@/lib/api/home";
import {
  archiveAdminArticleApi,
  approveAdminArticleApi,
  assignAdminArticleToPanelApi,
  getAdminAllArticlesApi,
  getAdminPublishedArticlesApi,
  getAdminQueuedArticlesApi,
  removeAdminArticleFromPanelApi,
  reorderAdminArticleInPanelApi,
  rejectAdminArticleApi,
  updateAdminArticleStatusApi,
} from "@/lib/api/admin_dashboard";
import type { AdminDashboardData, AdminPanelName } from "./types";

export async function getAdminDashboardData(): Promise<AdminDashboardData> {
  const [queuedArticles, publishedArticles, allArticles, homePage] = await Promise.all([
    getAdminQueuedArticlesApi(),
    getAdminPublishedArticlesApi(),
    getAdminAllArticlesApi(),
    getHomePageDataNormalised(),
  ]);

  return {
    queuedArticles,
    publishedArticles,
    allArticles,
    homePage,
  };
}

export async function approveAdminArticle(articleId: string) {
  return approveAdminArticleApi(articleId);
}

export async function rejectAdminArticle(articleId: string, rejectionReason: string) {
  return rejectAdminArticleApi(articleId, rejectionReason);
}

export async function archiveAdminArticle(articleId: string) {
  return archiveAdminArticleApi(articleId);
}

export async function updateAdminArticleStatus(articleId: string, status: AdminDashboardData["allArticles"][number]["status"], rejectionReason?: string) {
  return updateAdminArticleStatusApi(articleId, status, rejectionReason);
}

export async function assignAdminArticleToPanel(panelName: AdminPanelName, articleId: string, position?: number) {
  return assignAdminArticleToPanelApi(panelName, articleId, position);
}

export async function removeAdminArticleFromPanel(panelName: AdminPanelName, articleId: string) {
  return removeAdminArticleFromPanelApi(panelName, articleId);
}

export async function reorderAdminArticleInPanel(panelName: AdminPanelName, articleId: string, direction: "up" | "down") {
  return reorderAdminArticleInPanelApi(panelName, articleId, direction);
}
