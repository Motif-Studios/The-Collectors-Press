import { getCurrentUser } from "@/features/auth/queries/getCurrentUser";
import { getMockSavedStoriesPageData } from "./mock/saved_stories";

export async function getSavedStoriesPageDataApi() {

  const user = await getCurrentUser();
  if (!user) {
    console.error("No user found");
    return [];
  }

  const response = await fetch(`http://localhost:5001/articles/saved?user_id=${user.id}`);

  if (!response.ok) {
    console.error("Failed to fetch saved stories:", response.statusText);
    return [];
  }

  const data = await response.json();
  return data;
}