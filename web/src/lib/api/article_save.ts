"use client";

import { API_BASE_URL_SERVER } from "@/lib/env";
import { fetchWithTimeout } from "@/lib/fetchWithTimeout";

export async function saveArticleForUser(userId: string, articleId: string) {
  const response = await fetchWithTimeout(`${API_BASE_URL_SERVER}/articles/save`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id: userId,
      article_id: articleId,
    }),
  });

  if (!response.ok) {
    let errorMessage = `Failed to save article (${response.status})`;
    try {
      const errorBody = await response.json();
      if (errorBody?.message) {
        errorMessage = String(errorBody.message);
      }
    } catch {
      const errorText = await response.text();
      if (errorText) {
        errorMessage = errorText;
      }
    }
    throw new Error(errorMessage);
  }

  return response.json();
}

export async function isArticleSavedForUser(userId: string, articleId: string) {
  const url = `${API_BASE_URL_SERVER}/articles/is-saved?user_id=${encodeURIComponent(
    userId,
  )}&article_id=${encodeURIComponent(articleId)}`;

  const resp = await fetchWithTimeout(url, { method: "GET", timeout: 4000 });
  if (!resp.ok) return false;

  try {
    const body = await resp.json();
    if (body && typeof body.saved === "boolean") {
      return body.saved === true;
    }
  } catch {
    // fallthrough to fallback check
  }

  // Fallback: fetch the saved list and check if the article appears there
  try {
    const listUrl = `${API_BASE_URL_SERVER}/articles/saved?user_id=${encodeURIComponent(userId)}`;
    const listResp = await fetchWithTimeout(listUrl, { method: "GET", timeout: 4000 });
    if (!listResp.ok) return false;
    const listBody = await listResp.json();
    if (Array.isArray(listBody)) {
      return listBody.some((item: unknown) => {
        const it = item as { article_id?: string | number; id?: string | number };
        return String(it.article_id ?? it.id ?? "") === String(articleId);
      });
    }
  } catch {
    // ignore and return false
  }

  return false;
}
