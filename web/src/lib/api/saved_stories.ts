import { getCurrentUser } from "@/features/auth/queries/getCurrentUser";
import { API_BASE_URL_SERVER } from "@/lib/env";
import { fetchWithTimeout } from "@/lib/fetchWithTimeout";
import type { SavedStoriesPageData } from "@/features/saved_stories/types";

export async function getSavedStoriesPageDataApi(): Promise<SavedStoriesPageData> {

  const user = await getCurrentUser();
  if (!user) {
    console.error("No user found");
    return [];
  }

  const response = await fetchWithTimeout(`${API_BASE_URL_SERVER}/articles/saved?user_id=${encodeURIComponent(user.id)}`, { timeout: 5000 });

  if (!response || !response.ok) {
    console.error("Failed to fetch saved stories:", response?.statusText);
    return [];
  }

  const data = await response.json();
  return Array.isArray(data) ? data : [];
}