import { supabase } from "../../lib/supabase";
import { randomUUID } from "crypto";

// Local copy of the minimal `StudioCreateArticle` type used by the API.
// Kept here to avoid importing types from the `web` package during API build.
type EditorJsBlock = {
    id?: string;
    type: string;
    data: Record<string, unknown>;
};

type EditorJsContent = {
    time?: number;
    blocks: EditorJsBlock[];
    version?: string;
};

type StudioCreateArticle = {
    id?: string;
    title: string;
    subtitle: string;
    category: string;
    status: "draft" | "published";
    lastSavedLabel: string;
    coverImageCaption: string;
    body: EditorJsContent;
};

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
    const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("id")
        .eq("id", userId)
        .maybeSingle();

    if (profileError) {
        console.error("Error checking profile for article creation:", profileError);
        throw new Error(`Failed to check profile: ${profileError.message}`);
    }

    if (!profile) {
        const { error: createProfileError } = await supabase
            .from("profiles")
            .insert({
                id: userId,
                user_type: "normal",
            });

        if (createProfileError) {
            console.error("Error creating missing profile for article creation:", createProfileError);
            throw new Error(`Failed to create profile: ${createProfileError.message}`);
        }
    }

    const { data, error } = await supabase
        .from("article")
        .insert({ 
            author_id: userId, 
            title: "Untitled article",  
            preview_text: "Article preview text goes here. This should be a short summary or introduction to the article content.",
            description: "Article description goes here. This can be a longer summary or overview of the article, providing more context and details about the content.",
            slug: `untitled-article-${Date.now()}-${randomUUID().slice(0, 8)}`,
            status: "draft",
        })
        .select("*")
        .single();

    if (error) {
        console.error("Error creating article:", error);
        throw new Error(error.message);
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

        // delete all existing relations for this article
        const { error: articleCategoryDeleteError } = await supabase
            .from("article_categories")
            .delete()
            .eq("article_id", articleId);

        if (articleCategoryDeleteError) {
            console.error("Error deleting existing article category relations:", articleCategoryDeleteError);
            throw new Error("Failed to save article category");
        }

        // save new relation with updated category
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