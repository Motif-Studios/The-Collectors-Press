import { StudioCreateArticle } from "../types";

export async function saveArticle(articleId: string, content: StudioCreateArticle) {
    console.log("article data: ", { articleId, content });
    
    const response = await fetch(`http://localhost:5001/dashboard/save_article/${articleId}`, {
        method: "POST",
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