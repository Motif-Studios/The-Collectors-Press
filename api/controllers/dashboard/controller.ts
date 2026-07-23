import { supabase } from "../../lib/supabase";

type ArticleStatus = "draft" | "submitted" | "rejected" | "published" | "archived";

type StudioCreateArticle = {
    title: string;
    subtitle: string;
    body: unknown;
    category?: string;
    coverImageCaption?: string;
    coverImageUrl?: string;
    status?: ArticleStatus;
    rejectionReason?: string;
};

function assertPanelIsManuallyManaged(panelName: string) {
    if (panelName === "secondary_mini_cards") {
        throw new Error("The Recently Added panel is managed automatically.");
    }
}

async function updateArticleStatus(
    articleId: string,
    status: ArticleStatus,
    options?: { rejectionReason?: string | null; clearRejectionReason?: boolean }
) {
    const updatePayload: Record<string, unknown> = {
        status,
        updated_at: new Date().toISOString(),
    };

    if (options?.clearRejectionReason) {
        updatePayload.rejection_reason = null;
    }

    if (typeof options?.rejectionReason !== "undefined") {
        updatePayload.rejection_reason = options.rejectionReason;
    }

    const { error } = await supabase
        .from("article")
        .update(updatePayload)
        .eq("article_id", articleId);

    if (error) {
        console.error(`Error updating article status to ${status}:`, error);
        throw new Error(`Failed to update article status to ${status}`);
    }

    if (status === "published" || status === "archived") {
        await syncRecentlyAddedPanel();
    }

    return { success: true };
}

async function resolveUserEmail(userId: string) {
    try {
        const { data, error } = await supabase.auth.admin.getUserById(userId);
        if (error || !data?.user) return null;
        return data.user.email ?? null;
    } catch {
        return null;
    }
}

async function getPanelIdByName(name: string): Promise<string | null> {
    const { data } = await supabase.from("panels").select("id").eq("name", name).single();
    return data?.id ?? null;
}

/** Auto-fill the secondary_mini_cards panel with the 4 most recently published articles */
async function syncRecentlyAddedPanel() {
    const panelId = await getPanelIdByName("secondary_mini_cards");
    if (!panelId) return;

    const { data: latestArticles } = await supabase
        .from("article")
        .select("article_id")
        .eq("status", "published")
        .order("created_at", { ascending: false })
        .limit(4);

    if (!latestArticles || latestArticles.length === 0) return;

    await supabase.from("article_panels").delete().eq("panel_id", panelId);

    const inserts = latestArticles.map((a, i) => ({
        panel_id: panelId,
        article_id: a.article_id,
        position: i + 1,
    }));

    await supabase.from("article_panels").insert(inserts);
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
            rejection_reason: null,
            cover_image_url: null,
        })
        .select("*")
        .single();

    if (error) {
        console.error("Error creating article:", error);
        throw new Error("Failed to create article");
    }

    return data;
}

export async function submitArticle(articleId: string) {
    return updateArticleStatus(articleId, "submitted", { clearRejectionReason: true });
}

export async function deleteArticle(articleId: string) {
    const { error } = await supabase
        .from("article")
        .delete()
        .eq("article_id", articleId);

    if (error) {
        console.error("Error deleting article:", error);
        throw new Error("Failed to delete article");
    }

    return { success: true };
}

export async function publishArticle(articleId: string) {
    return updateArticleStatus(articleId, "published", { clearRejectionReason: true });
}

export async function rejectArticle(articleId: string, rejectionReason: string) {
    const reason = rejectionReason.trim();

    if (!reason) {
        throw new Error("A rejection reason is required");
    }

    return updateArticleStatus(articleId, "rejected", { rejectionReason: reason });
}

export async function archiveArticle(articleId: string) {
    return updateArticleStatus(articleId, "archived", { clearRejectionReason: false });
}

export async function setArticleStatus(
    articleId: string,
    status: ArticleStatus,
    rejectionReason?: string
) {
    if (status === "rejected") {
        return rejectArticle(articleId, rejectionReason ?? "");
    }

    if (status === "archived") {
        return archiveArticle(articleId);
    }

    if (status === "published") {
        return publishArticle(articleId);
    }

    if (status === "submitted") {
        return submitArticle(articleId);
    }

    return updateArticleStatus(articleId, status, { clearRejectionReason: true });
}

export async function getAdminQueuedArticles() {
    const { data, error } = await supabase
        .from("article")
        .select("article_id, title, slug, status, author_id, updated_at, rejection_reason")
        .eq("status", "submitted")
        .order("updated_at", { ascending: false });

    if (error) {
        console.error("Error fetching admin queued articles:", error);
        return [];
    }

    const articles = data || [];
    const authorEmails = await Promise.all(
        articles.map((a) => resolveUserEmail(a.author_id))
    );

    return articles.map((article, i) => ({
        id: article.article_id,
        title: article.title,
        slug: article.slug,
        status: article.status,
        category: "",
        updatedAtLabel: article.updated_at,
        authorName: authorEmails[i] ?? "Unknown",
        rejectionReason: article.rejection_reason ?? "",
    }));
}

export async function getAdminPublishedArticles() {
    const { data, error } = await supabase
        .from("article")
        .select("article_id, title, slug, status, author_id, updated_at, rejection_reason")
        .eq("status", "published")
        .order("updated_at", { ascending: false });

    if (error) {
        console.error("Error fetching admin published articles:", error);
        return [];
    }

    const articles = data || [];
    const authorEmails = await Promise.all(
        articles.map((a) => resolveUserEmail(a.author_id))
    );

    return articles.map((article, i) => ({
        id: article.article_id,
        title: article.title,
        slug: article.slug,
        status: article.status,
        category: "",
        updatedAtLabel: article.updated_at,
        authorName: authorEmails[i] ?? "Unknown",
        rejectionReason: article.rejection_reason ?? "",
    }));
}

export async function getAdminAllArticles() {
    const { data, error } = await supabase
        .from("article")
        .select("article_id, title, slug, status, author_id, updated_at, rejection_reason")
        .order("updated_at", { ascending: false });

    if (error) {
        console.error("Error fetching admin all articles:", error);
        return [];
    }

    const articles = data || [];
    const authorEmails = await Promise.all(
        articles.map((a) => resolveUserEmail(a.author_id))
    );

    return articles.map((article, i) => ({
        id: article.article_id,
        title: article.title,
        slug: article.slug,
        status: article.status,
        category: "",
        updatedAtLabel: article.updated_at,
        authorName: authorEmails[i] ?? "Unknown",
        rejectionReason: article.rejection_reason ?? "",
    }));
}

export async function approveArticle(articleId: string) {
    return publishArticle(articleId);
}

export async function assignArticleToPanel(panelName: string, articleId: string, position?: number) {
    assertPanelIsManuallyManaged(panelName);

    const panelId = await getPanelIdByName(panelName);
    if (!panelId) throw new Error(`Panel '${panelName}' not found`);

    // Determine position: use provided, or append at end
    let targetPosition = position;
    if (typeof targetPosition !== "number") {
        const { data: existing } = await supabase
            .from("article_panels")
            .select("position")
            .eq("panel_id", panelId)
            .order("position", { ascending: false })
            .limit(1);
        targetPosition = (existing?.[0]?.position ?? 0) + 1;
    }

    // Remove any existing entry for this article in this panel
    await supabase
        .from("article_panels")
        .delete()
        .eq("panel_id", panelId)
        .eq("article_id", articleId);

    const { error } = await supabase.from("article_panels").insert({
        panel_id: panelId,
        article_id: articleId,
        position: targetPosition,
    });

    if (error) {
        console.error("Error assigning article to panel:", error);
        throw new Error("Failed to assign article to panel");
    }

    return { success: true };
}

export async function removeArticleFromPanel(panelName: string, articleId: string) {
    assertPanelIsManuallyManaged(panelName);

    const panelId = await getPanelIdByName(panelName);
    if (!panelId) throw new Error(`Panel '${panelName}' not found`);

    const { error } = await supabase
        .from("article_panels")
        .delete()
        .eq("panel_id", panelId)
        .eq("article_id", articleId);

    if (error) {
        console.error("Error removing article from panel:", error);
        throw new Error("Failed to remove article from panel");
    }

    // Re-number remaining positions
    const { data: remaining } = await supabase
        .from("article_panels")
        .select("id, position")
        .eq("panel_id", panelId)
        .order("position", { ascending: true });

    if (remaining && remaining.length > 0) {
        await Promise.all(
            remaining.map((row, i) =>
                supabase.from("article_panels").update({ position: i + 1 }).eq("id", row.id)
            )
        );
    }

    return { success: true };
}

export async function reorderArticleInPanel(panelName: string, articleId: string, direction: "up" | "down") {
    assertPanelIsManuallyManaged(panelName);

    const panelId = await getPanelIdByName(panelName);
    console.log("panelId:", panelId, "panelName:", panelName);
    if (!panelId) throw new Error(`Panel '${panelName}' not found`);

    const { data: rows } = await supabase
        .from("article_panels")
        .select("id, article_id, position")
        .eq("panel_id", panelId)
        .order("position", { ascending: true });

    console.log(rows);
    if (!rows || rows.length < 2) return { success: false };

    const idx = rows.findIndex((r) => r.article_id === articleId);
    if (idx === -1) throw new Error("Article not found in panel");

    const swapIdx = direction === "up" ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= rows.length) return { success: false };

    const current = rows[idx];
    const swap = rows[swapIdx];
    console.log("current article:", current.article_id, "position:", current.position);
    console.log("swap article:", swap.article_id, "position:", swap.position);

    await Promise.all([
        supabase.from("article_panels").update({ position: swap.position }).eq("id", current.id),
        supabase.from("article_panels").update({ position: current.position }).eq("id", swap.id),
    ]);

    return { success: true };
}

export async function saveArticle(articleId: string, articleData: StudioCreateArticle) {
    const updatePayload: Record<string, unknown> = {
        title: articleData.title,
        updated_at: new Date().toISOString(),
        preview_text: articleData.subtitle,
        description: articleData.subtitle,
        content: articleData.body,
        image_alt: articleData.coverImageCaption,
    };

    if (typeof articleData.coverImageUrl === "string") {
        updatePayload.cover_image_url = articleData.coverImageUrl;
    }

    if (typeof articleData.status === "string") {
        updatePayload.status = articleData.status;
    }

    if (typeof articleData.rejectionReason !== "undefined") {
        updatePayload.rejection_reason = articleData.rejectionReason;
    }

    const { data, error } = await supabase
        .from("article")
        .update(updatePayload)
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

        const { error: clearCategoryError } = await supabase
            .from("article_categories")
            .delete()
            .eq("article_id", articleId);

        if (clearCategoryError) {
            console.error("Error clearing article category relation:", clearCategoryError);
            throw new Error("Failed to save article category");
        }

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