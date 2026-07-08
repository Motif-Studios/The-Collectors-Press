import { supabase } from "../../lib/supabase";

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
    status: "draft" | "submitted" | "published";
    lastSavedLabel: string;
    coverImageCaption: string;
    body: EditorJsContent;
};

type HomePanelName =
    | "primary_feature"
    | "primary_stories"
    | "secondary_top_stories"
    | "secondary_stories"
    | "secondary_mini_cards";

const PANEL_MAX_ITEMS: Record<HomePanelName, number> = {
    primary_feature: 1,
    primary_stories: 3,
    secondary_top_stories: 2,
    secondary_stories: 4,
    secondary_mini_cards: 4,
};

// Simple in-memory cache for panel IDs (per request for safety)
const panelIdCache = new Map<string, Promise<string>>();

async function resolveUserEmail(userId: string) {
    try {
        const { data, error } = await supabase.auth.admin.getUserById(userId);

        if (error || !data?.user) {
            return null;
        }

        return data.user.email ?? null;
    } catch (error) {
        console.error("Error resolving user email:", error);
        return null;
    }
}

async function resolvePanelId(panelName: HomePanelName) {
    // Optimized: Cache panel ID lookups within the application lifecycle
    if (panelIdCache.has(panelName)) {
        return panelIdCache.get(panelName)!;
    }

    const panelPromise = (async () => {
        const { data, error } = await supabase
            .from("panels")
            .select("id")
            .eq("name", panelName)
            .maybeSingle();

        if (error) {
            console.error("Error resolving panel id:", error);
            throw new Error("Failed to resolve panel");
        }

        if (!data?.id) {
            throw new Error(`Panel not found: ${panelName}`);
        }

        return data.id;
    })();

    panelIdCache.set(panelName, panelPromise);
    return panelPromise;
}

async function getAdminArticleRows(statusFilter?: string[]) {
    let query = supabase
        .from("article")
        .select("article_id, author_id, title, slug, status, preview_text, description, created_at, updated_at, cover_image_url, image_alt")
        .order("created_at", { ascending: false })
        .limit(200); // Optimized: Add limit to prevent loading too many articles

    if (statusFilter?.length) {
        query = query.in("status", statusFilter);
    }

    const { data, error } = await query;

    if (error) {
        console.error("Error fetching admin article rows:", error);
        throw new Error("Failed to load admin articles");
    }

    const authorIds = [...new Set((data ?? []).map((article) => article.author_id).filter(Boolean))];
    const authorNameEntries = await Promise.all(
        authorIds.map(async (authorId) => [authorId, (await resolveUserEmail(authorId)) ?? "Unknown author"] as const),
    );

    const authorNameById = new Map(authorNameEntries);

    return (data ?? []).map((article) => ({
        id: article.article_id,
        title: article.title,
        slug: article.slug,
        status: article.status,
        category: article.preview_text ?? article.description ?? "",
        updatedAtLabel: article.updated_at ?? article.created_at ?? "",
        authorName: authorNameById.get(article.author_id) ?? "Unknown author",
    }));
}

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

export async function getAdminArticles() {
    return getAdminArticleRows();
}

export async function getAdminPublishedArticles() {
    return getAdminArticleRows(["published"]);
}

export async function getAdminQueuedArticles() {
    return getAdminArticleRows(["submitted"]);
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
            status: articleData.status,
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

export async function approveArticle(articleId: string) {
    return publishArticle(articleId);
}

export async function assignArticleToPanel(panelName: HomePanelName, articleId: string) {
    const panelId = await resolvePanelId(panelName);

    const { data: existingAssignment, error: existingAssignmentError } = await supabase
        .from("article_panels")
        .select("article_id")
        .eq("panel_id", panelId)
        .eq("article_id", articleId)
        .maybeSingle();

    if (existingAssignmentError) {
        console.error("Error checking existing panel assignment:", existingAssignmentError);
        throw new Error("Failed to update article panel assignment");
    }

    const { count, error: countError } = await supabase
        .from("article_panels")
        .select("article_id", { count: "exact", head: true })
        .eq("panel_id", panelId);

    if (countError) {
        console.error("Error checking panel capacity:", countError);
        throw new Error("Failed to update article panel assignment");
    }

    const maxItems = PANEL_MAX_ITEMS[panelName];

    if (!existingAssignment && (count ?? 0) >= maxItems) {
        throw new Error(`This panel already has the maximum of ${maxItems} articles.`);
    }

    const { error: removeError } = await supabase
        .from("article_panels")
        .delete()
        .eq("panel_id", panelId)
        .eq("article_id", articleId);

    if (removeError) {
        console.error("Error clearing article from panel before reassignment:", removeError);
        throw new Error("Failed to update article panel assignment");
    }

    const { error } = await supabase
        .from("article_panels")
        .insert({
            panel_id: panelId,
            article_id: articleId,
        });

    if (error) {
        console.error("Error assigning article to panel:", error);
        throw new Error("Failed to assign article to panel");
    }

    return { success: true };
}

export async function removeArticleFromPanel(panelName: HomePanelName, articleId: string) {
    const panelId = await resolvePanelId(panelName);

    const { error } = await supabase
        .from("article_panels")
        .delete()
        .eq("panel_id", panelId)
        .eq("article_id", articleId);

    if (error) {
        console.error("Error removing article from panel:", error);
        throw new Error("Failed to remove article from panel");
    }

    return { success: true };
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