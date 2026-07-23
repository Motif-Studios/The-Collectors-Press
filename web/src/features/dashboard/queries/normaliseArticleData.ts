import { getCurrentUser } from "@/features/auth/queries/getCurrentUser";
import { API_BASE_URL_SERVER } from "@/lib/env";
import type { StudioCreateArticleStatus } from "@/features/article_create/types";

type ArticleType = {
    article_id?: string;
    id?: string;
    title?: string;
    preview_text?: string;
    status?: string;
    updated_at?: string;
    image_alt?: string;
    cover_image_url?: string;
    rejection_reason?: string;
    content?: unknown;
    body?: unknown;
};

function parseMaybeJson(value: unknown): unknown {
    if (typeof value !== "string") return value;

    try {
        return JSON.parse(value);
    } catch {
        return value;
    }
}

function isEditorJsContent(value: unknown): value is { time?: number; version?: string; blocks: Array<{ type: string; data: Record<string, unknown> }> } {
    return typeof value === "object" && value !== null && Array.isArray((value as { blocks?: unknown }).blocks);
}

export async function normaliseArticleData(data: unknown) {
    const article = (data ?? {}) as ArticleType;
    const articleId = article.article_id ?? article.id;

    const user = await getCurrentUser();
    const authorName = user?.name || "User";

    const getAllCategoriesResponse = await fetch(`${API_BASE_URL_SERVER}/categories/all`);
    const allCategories = await getAllCategoriesResponse.json();
    const categoryNames = allCategories.map((cat: { category_name: string }) => cat.category_name);
    
    let category = "Uncategorized";
    if (articleId && articleId !== "undefined") {
        const getCategory = await fetch(`${API_BASE_URL_SERVER}/categories/article/${articleId}`);
        const articleCategoryData = await getCategory.json();
        category = articleCategoryData?.[0]?.category_name ?? "Uncategorized";
    }

    console.log("category:", category);

    const parsedContent = parseMaybeJson(article.content ?? article.body);
    const safeBody = isEditorJsContent(parsedContent)
        ? {
            time: parsedContent.time,
            version: parsedContent.version,
            blocks: parsedContent.blocks,
          }
        : {
            time: Date.now(),
            version: "2.30.0",
            blocks: [
                {
                    type: "paragraph",
                    data: {
                        text: "",
                    },
                },
            ],
          };

    return {
        authorName,
        categories: categoryNames,
        article:{
            title: article.title || "",
            id: articleId || "",
            subtitle: article.preview_text || "",
            category: category,
            status: (article.status as StudioCreateArticleStatus) || "draft",
            lastSavedLabel: article.updated_at || "",
            coverImageCaption: article.image_alt || "",
            coverImageUrl: article.cover_image_url || "",
            rejectionReason: article.rejection_reason || "",
            body: safeBody,
        },
    };
}
