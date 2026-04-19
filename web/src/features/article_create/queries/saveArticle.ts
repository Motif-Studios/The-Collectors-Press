import { StudioCreateArticle } from "../types";
import { API_BASE_URL } from "@/lib/env";

export async function saveArticle(articleId: string, content: StudioCreateArticle) {
    console.log("article data: ", { articleId, content });
    
    const response = await fetch(`${API_BASE_URL}/dashboard/save_article/${articleId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(content),
    });

    if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`Failed to save article: ${response.status} ${errorBody}`);
    }

    return response.json();
}