import { supabase } from "../../lib/supabase";
import type { StudioCreateArticle } from "../../../web/src/features/article_create/types";

export async function getDashboardArticles(userId: string) {
    const { data, error } = await supabase
        .from("article")
        .select("*")
        .eq("author_id", userId)
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching articles for studio dashboard:", error);
        return error;
    }

    return data;
}

export async function createArticle(userId: string) {
    const { data, error } = await supabase
        .from("article")
        .insert({ 
            author_id: userId, 
            title: "Untitled article",  
            preview_text: "Article preview text goes here. This should be a short summary or introduction to the article content.",
            description: "Article description goes here. This can be a longer summary or overview of the article, providing more context and details about the content.",
            slug: `untitled-article-${Date.now()}`,
            status: "draft",
        })
        .select("*")
        .single();

    if (error) {
        console.error("Error creating article:", error);
        throw new Error("Failed to create article");
    }

    return data;
}

export async function deleteArticle(articleId: string) {
    const { error: articleDeleteError } = await supabase
        .from("article")
        .delete()
        .eq("article_id", articleId);

    if (articleDeleteError) {
        console.error("Error deleting article:", articleDeleteError);
        throw new Error(`Failed to delete article: ${articleDeleteError.message}`);
    }

    return;
}

export async function saveArticle(articleId: string, articleData: StudioCreateArticle) {
    const { data, error } = await supabase
        .from("article")
        .update({ 
            title: articleData.title, 
            updated_at: new Date().toISOString(),
            preview_text: articleData.subtitle, 
            content: articleData.body,
            image_alt: articleData.coverImageCaption,
         })
        .eq("article_id", articleId)
        .select("*")
        .single();
    
    if (error) {
        console.error("Error saving article:", error);
        throw new Error("Failed to save article");
    }

    if (articleData.category) {
        const { data: categoryData, error: categoryError } = await supabase
            .from("category")
            .select("category_id")
            .eq("category_name", articleData.category)
            .maybeSingle();

        if (categoryError) {
            console.error("Error fetching category by name while saving article:", categoryError);
            throw new Error("Failed to save article category");
        }

        if (!categoryData) {
            return data;
        }

        // check if the article-category relation already exists
        const { data: existingRelation, error: relationError } = await supabase
            .from("article_categories")
            .select("*")
            .eq("article_id", articleId)
            .eq("category_id", categoryData.category_id)
            .maybeSingle();

        if (relationError) {
            console.error("Error checking existing article category relation:", relationError);
            throw new Error("Failed to save article category");
        }

        if (!existingRelation) {
            const { error: articleCategoryError } = await supabase
                .from("article_categories")
                .insert({
                    article_id: articleId,
                    category_id: categoryData.category_id,
                });

            if (articleCategoryError) {
                console.error("Error saving article category relation:", articleCategoryError);
                throw new Error("Failed to save article category");
            }
        }
    }

    return data;
}

export async function publishArticle(articleId: string) {
    const { data, error } = await supabase
        .from("article")
        .update({ 
            status: "published",
            updated_at: new Date().toISOString(),
         })
        .eq("article_id", articleId)
        .select("*")
        .single();

    if (error) {
        console.error("Error publishing article:", error);
        throw new Error("Failed to publish article");
    }

    return data;
}

export async function getArticlesByStatus(userId: string, status: string) {
    const { data, error } = await supabase
        .from("article")
        .select("*")
        .eq("author_id", userId)
        .eq("status", status)
        .order("created_at", { ascending: false });
    
    if (error) {
        console.error(`Error fetching ${status} articles for studio dashboard:`, error);
        return error;
    }

    return data;
}