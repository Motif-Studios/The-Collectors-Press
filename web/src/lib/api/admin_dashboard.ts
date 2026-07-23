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
  status: "draft" | "submitted" | "rejected" | "published" | "archived";
  category: string;
  updatedAtLabel: string;
  authorName: string;
  rejectionReason?: string;
};

export type AdminPublishedArticle = {
  id: string;
  title: string;
  slug: string;
  status: "draft" | "submitted" | "rejected" | "published" | "archived";
  category: string;
  updatedAtLabel: string;
  authorName: string;
  rejectionReason?: string;
};

export type AdminAllArticle = AdminPublishedArticle;

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

export async function getAdminAllArticlesApi(): Promise<AdminAllArticle[]> {
  try {
    const response = await fetch(`${API_BASE_URL_SERVER}/dashboard/admin/all_articles`);

    if (!response.ok) {
      console.error("Failed to fetch all admin articles:", response.status, response.statusText);
      return [];
    }

    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Failed to fetch all admin articles:", error);
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

export async function rejectAdminArticleApi(articleId: string, rejectionReason: string) {
  const response = await fetch(`${API_BASE_URL_SERVER}/dashboard/reject_article/${articleId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ rejectionReason }),
  });

  if (!response.ok) {
    throw new Error(`Failed to reject article: ${await readApiError(response)}`);
  }

  return response.json();
}

export async function archiveAdminArticleApi(articleId: string) {
  const response = await fetch(`${API_BASE_URL_SERVER}/dashboard/archive_article/${articleId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to archive article: ${await readApiError(response)}`);
  }

  return response.json();
}

export async function updateAdminArticleStatusApi(
  articleId: string,
  status: AdminAllArticle["status"],
  rejectionReason?: string,
) {
  const response = await fetch(`${API_BASE_URL_SERVER}/dashboard/admin/article/${articleId}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status, rejectionReason }),
  });

  if (!response.ok) {
    throw new Error(`Failed to update article status: ${await readApiError(response)}`);
  }

  return response.json();
}

export async function assignAdminArticleToPanelApi(panelName: AdminPanelName, articleId: string, position?: number) {
  const url = new URL(`${API_BASE_URL_SERVER}/dashboard/admin/panel/${panelName}/${articleId}`);
  if (typeof position === "number") {
    url.searchParams.set("position", String(position));
  }

  const response = await fetch(url.toString(), {
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

export async function reorderAdminArticleInPanelApi(
  panelName: AdminPanelName,
  articleId: string,
  direction: "up" | "down"
) {
  const response = await fetch(
    `${API_BASE_URL_SERVER}/dashboard/admin/panel/${panelName}/${articleId}/reorder`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ direction }),
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to reorder article: ${await readApiError(response)}`);
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
