export async function deleteArticle(articleId: string) {
    const response = await fetch(`http://localhost:5001/dashboard/delete_article/${articleId}`, {
        method: "POST",
    });

    if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`Failed to delete article: ${response.status} ${errorBody}`);
    }

    window.location.reload(); 
    
    return response.json();
}