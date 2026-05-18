import { getCurrentUser } from "@/features/auth/queries/getCurrentUser";
import { API_BASE_URL_SERVER } from "@/lib/env";
import type { SavedStoriesPageData } from "@/features/saved_stories/types";

export async function getSavedStoriesPageDataApi(): Promise<SavedStoriesPageData> {

  const user = await getCurrentUser();
  if (!user) {
    console.error("No user found");
    return [];
  }

  const response = await fetch(`${API_BASE_URL_SERVER}/articles/saved?user_id=${user.id}`);

  if (!response.ok) {
    console.error("Failed to fetch saved stories:", response.statusText);
    return [];
  }

  const data = await response.json();
  return Array.isArray(data) ? data : [];
}