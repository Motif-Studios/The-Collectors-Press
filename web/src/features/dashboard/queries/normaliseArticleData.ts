import { getCurrentUser } from "@/features/auth/queries/getCurrentUser";
import { API_BASE_URL } from "@/lib/env";

type ArticleType = {
    article_id?: string;
    id?: string;
    title?: string;
    preview_text?: string;
    status?: string;
    updated_at?: string;
    image_alt?: string;
    content?: string;
};

export async function normaliseArticleData(data: unknown) {
    const article = (data ?? {}) as ArticleType;
    const articleId = article.article_id ?? article.id;

    const user = await getCurrentUser();
    const authorName = user?.name || "User";

    const getAllCategoriesResponse = await fetch(`${API_BASE_URL}/categories/all`);
    const allCategories = await getAllCategoriesResponse.json();
    const categoryNames = allCategories.map((cat: { category_name: string }) => cat.category_name);
    
    const getCategory = await fetch(`${API_BASE_URL}/categories/article/${articleId}`);
    const articleCategoryData = await getCategory.json();
    const category = articleCategoryData?.[0]?.category_name ?? "Uncategorized";

    console.log("category:", category);

    return {
        authorName,
        categories: categoryNames,
        article:{
            title: article.title || "",
            id: articleId || "",
            subtitle: article.preview_text || "",
            category: category,
            status: article.status || "draft",
            lastSavedLabel: article.updated_at || "",
            coverImageCaption: article.image_alt || "",
            body: {
                time: Date.now(),
                version: "2.30.0",
                blocks: [
                    {
                        type: "paragraph",
                        data: {
                            text: article.content || "Start writing your story here...",
                        },
                    },
                ],
            },
        },
    };
}
