import { getCurrentUser } from "@/features/auth/queries/getCurrentUser";
import { API_BASE_URL_SERVER } from "@/lib/env";

export async function createArticle() {
    try {
    const user = await getCurrentUser();

    if (!user?.id) {
        return { error: "User is not authenticated" };
    }

    const response = await fetch(`${API_BASE_URL_SERVER}/dashboard/create_article/${user.id}`, {
        method: "POST",
    });
    if (!response.ok) {
        return { error: "Failed to create article" };
    }

        const data = await response.json();
        return {
            article_id: data.article_id,
            slug: data.slug,
        };
    } catch (error) {
        console.error("Error creating article:", error);
        return { error: error instanceof Error ? error.message : "Failed to create article" };
    }
}