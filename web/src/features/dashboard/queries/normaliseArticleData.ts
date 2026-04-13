import { getCurrentUser } from "@/features/auth/queries/getCurrentUser";

type ArticleType = {
    article_id?: string;
    id?: string;
    title?: string;
    subtitle?: string;
    category?: string;
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

    const getAllCategoriesResponse = await fetch("http://localhost:5001/categories/all");
    const allCategories = await getAllCategoriesResponse.json();
    const categoryNames = allCategories.map((cat: { category_name: string }) => cat.category_name);
    const normalizedCategory =
        article.category && categoryNames.includes(article.category)
            ? article.category
            : (categoryNames[0] ?? "");

    return {
        authorName,
        categories: categoryNames,
        article:{
            title: article.title || "",
            id: articleId || "",
            subtitle: article.subtitle || "",
            category: normalizedCategory,
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
