import { API_BASE_URL } from "@/lib/env";

export async function deleteArticle(articleId: string) {
    const response = await fetch(`${API_BASE_URL}/dashboard/delete_article/${articleId}`, {
        method: "POST",
    });

    if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`Failed to delete article: ${response.status} ${errorBody}`);
    }

    return response.json();
}

export async function submitArticle(articleId: string) {
    const response = await fetch(`${API_BASE_URL}/dashboard/submit_article/${articleId}`, {
        method: "POST",
    });

    if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`Failed to submit article: ${response.status} ${errorBody}`);
    }

    return response.json();
}
