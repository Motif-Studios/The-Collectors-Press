import { getCurrentUser } from "@/features/auth/queries/getCurrentUser";
import { API_BASE_URL } from "@/lib/env";

export async function createArticle() {
    const user = await getCurrentUser();

    if (!user?.id) {
        throw new Error("User is not authenticated");
    }

    const response = await fetch(`${API_BASE_URL}/dashboard/create_article/${user.id}`, {
        method: "POST",
    });
    if (!response.ok) {
        throw new Error("Failed to create article");
    }

    return response.json();
}