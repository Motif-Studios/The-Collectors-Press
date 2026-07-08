import { API_BASE_URL_SERVER } from "@/lib/env";

export type AdminPanelName =
  | "primary_feature"
  | "primary_stories"
  | "secondary_top_stories"
  | "secondary_stories"
  | "secondary_mini_cards";

export type AdminQueuedArticle = {
  id: string;
  title: string;
  slug: string;
  status: "draft" | "submitted" | "published";
  category: string;
  updatedAtLabel: string;
  authorName: string;
};

export type AdminPublishedArticle = {
  id: string;
  title: string;
  slug: string;
  status: "draft" | "submitted" | "published";
  category: string;
  updatedAtLabel: string;
  authorName: string;
};

async function readApiError(response: Response) {
  try {
    const body = await response.text();
    return body || response.statusText;
  } catch {
    return response.statusText;
  }
}

export async function getAdminQueuedArticlesApi(): Promise<AdminQueuedArticle[]> {
  try {
    const response = await fetch(`${API_BASE_URL_SERVER}/dashboard/admin/queued_articles`);

    if (!response.ok) {
      console.error("Failed to fetch admin queue:", response.status, response.statusText);
      return [];
    }

    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Failed to fetch admin queue:", error);
    return [];
  }
}

export async function getAdminPublishedArticlesApi(): Promise<AdminPublishedArticle[]> {
  try {
    const response = await fetch(`${API_BASE_URL_SERVER}/dashboard/admin/published_articles`);

    if (!response.ok) {
      console.error("Failed to fetch published admin articles:", response.status, response.statusText);
      return [];
    }

    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Failed to fetch published admin articles:", error);
    return [];
  }
}

export async function approveAdminArticleApi(articleId: string) {
  const response = await fetch(`${API_BASE_URL_SERVER}/dashboard/admin/approve_article/${articleId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to approve article: ${await readApiError(response)}`);
  }

  return response.json();
}

export async function assignAdminArticleToPanelApi(panelName: AdminPanelName, articleId: string) {
  const response = await fetch(`${API_BASE_URL_SERVER}/dashboard/admin/panel/${panelName}/${articleId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to assign article to panel: ${await readApiError(response)}`);
  }

  return response.json();
}

export async function removeAdminArticleFromPanelApi(panelName: AdminPanelName, articleId: string) {
  const response = await fetch(`${API_BASE_URL_SERVER}/dashboard/admin/panel/${panelName}/${articleId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to remove article from panel: ${await readApiError(response)}`);
  }

  return response.json();
}
