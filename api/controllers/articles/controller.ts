import { supabase } from "../../lib/supabase";

// Simple in-memory cache for panel IDs
const panelIdCache = new Map<string, Promise<string | null>>();

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

// Optimized: Cache panel ID lookups to avoid repeated queries
async function getPanelIdByName(panelName: string): Promise<string | null> {
    if (panelIdCache.has(panelName)) {
        return panelIdCache.get(panelName)!;
    }

    const panelPromise = (async () => {
        const { data } = await supabase
            .from("panels")
            .select("id")
            .eq("name", panelName)
            .single();
        return data?.id || null;
    })();

    panelIdCache.set(panelName, panelPromise);
    return panelPromise;
}

export async function getAllArticles() {
    // Optimized: Add limit to prevent loading entire database
    const { data, error } = await supabase
        .from("article")
        .select("*")
        .limit(200);
    if (error) {
        console.error("Error fetching all articles:", error);
        return error;
    }
    return data;
}

export async function getArticleByCategoryName(categoryName: string, limit?: number, offset?: number) {
    // Optimized: Use JOINs instead of 3 separate queries
    const { data, error } = await supabase
        .from("article_categories")
        .select(`
            article:article_id(*)
        `)
        .eq("category.category_name", categoryName);

    if (error) {
        console.error("Error fetching articles by category name:", error);
        return error;
    }

    let articlesData = (data || []).map(item => item.article).filter(Boolean);

    if (typeof limit === "number" && typeof offset === "number") {
        articlesData = articlesData.slice(offset, offset + limit);
    }

    return articlesData;
}

export async function getArticleById(articleId: string) {
    const { data, error } = await supabase
        .from("article")
        .select("*")
        .eq("article_id", articleId)
        .single();

    if (error) {
        console.error("Error fetching article by ID:", error);
        return error;
    }
    return data;
}

export async function getArticleBySlug(articleSlug: string) {
    const decodedSlug = decodeURIComponent(articleSlug);
            
    const { data, error } = await supabase
        .from("article")
        .select("*")
        .eq("slug", decodedSlug)
        .eq("status", "published")
        .maybeSingle();
    
    if (error) {
        console.error("Error fetching article by slug:", error);
        return error;
    }

    if (!data) {
        return null;
    }

    const authorId = data.author_id || "unknown-author";
    const authorName = (await resolveUserEmail(authorId)) ?? "Unknown author";

    return {
        ...data,
        author: {
            id: authorId,
            name: authorName,
            description: "",
            avatarSrc: `https://eu.ui-avatars.com/api/?name=${encodeURIComponent(String(authorName))}&size=250`,
            moreTopics: [],
        },
        body: data.content || { blocks: [] },
    };
}

export async function getSavedArticles(userId: string) {
    console.log("getSavedArticles called for userId:", userId);
    
    // Optimized: Use JOIN instead of fetching saved_articles IDs then fetching articles separately
    const { data: articlesData, error: articlesError } = await supabase
        .from("saved_articles")
        .select(`
            article:article_id(
                article_id, 
                title, 
                author_id,
                cover_image_url, 
                image_alt, 
                slug
            )
        `)
        .eq("user_id", userId);

    if (articlesError) {
        console.error("Error fetching saved articles for user:", articlesError);
        return [];
    }

    if (!articlesData || articlesData.length === 0) {
        console.log("No saved_articles rows found for user", userId);
        return [];
    }

    const articles = articlesData.map(item => item.article).filter(Boolean);
    const authorIds = [...new Set((articles).map((article: any) => article.author_id).filter(Boolean))];

    // Batch author email resolution - all at once instead of per article
    const authorEmailEntries = await Promise.all(
        authorIds.map(async (authorId) => [authorId, (await resolveUserEmail(authorId)) ?? "Unknown author"] as const),
    );

    const authorNameById = new Map(authorEmailEntries);

    const articlesWithAuthor = (articles as any[]).map((article) => ({
        id: article.article_id,
        title: article.title,
        author: authorNameById.get(article.author_id) ?? "Unknown author",
        imageSrc: article.cover_image_url,
        imageAlt: article.image_alt ?? article.title ?? "Article cover image",
        href: article.slug ? `/article/${encodeURIComponent(article.slug)}` : "#",
    }));

    console.log(`Found ${articlesWithAuthor.length} saved articles for user ${userId}`);

    return articlesWithAuthor;
}

export async function getLatestPrimaryArticle() {
    // Optimized: Use cache for panel ID lookup, then single JOIN query
    const panelId = await getPanelIdByName("primary_feature");
    if (!panelId) return null;

    const { data, error } = await supabase
        .from("article_panels")
        .select(`
            article:article_id(*)
        `)
        .eq("panel_id", panelId)
        .eq("article.status", "published")
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

    if (error) {
        console.error("Error fetching latest primary article:", error);
        return null;
    }

    return data?.article || null;
}

export async function getLatestPrimaryStories(limit?: number) {
    // Optimized: Use cache for panel ID lookup, then single JOIN query
    const panelId = await getPanelIdByName("primary_stories");
    if (!panelId) return [];

    const { data, error } = await supabase
        .from("article_panels")
        .select(`
            article:article_id(*)
        `)
        .eq("panel_id", panelId)
        .eq("article.status", "published")
        .order("created_at", { ascending: false })
        .limit(limit || 3);

    if (error) {
        console.error("Error fetching latest primary stories:", error);
        return [];
    }

    return (data || []).map(item => item.article).filter(Boolean);
}

export async function getLatestSecondaryTopStories(limit?: number) {
    // Optimized: Use cache for panel ID lookup, then single JOIN query
    const panelId = await getPanelIdByName("secondary_top_stories");
    if (!panelId) return [];

    const { data, error } = await supabase
        .from("article_panels")
        .select(`
            article:article_id(*)
        `)
        .eq("panel_id", panelId)
        .eq("article.status", "published")
        .order("created_at", { ascending: false })
        .limit(limit || 2);

    if (error) {
        console.error("Error fetching latest secondary top stories:", error);
        return [];
    }

    return (data || []).map(item => item.article).filter(Boolean);
}

export async function getLatestSecondaryStories(limit?: number) {
    // Optimized: Use cache for panel ID lookup, then single JOIN query
    const panelId = await getPanelIdByName("secondary_stories");
    if (!panelId) return [];

    const { data, error } = await supabase
        .from("article_panels")
        .select(`
            article:article_id(*)
        `)
        .eq("panel_id", panelId)
        .eq("article.status", "published")
        .order("created_at", { ascending: false })
        .limit(limit || 4);

    if (error) {
        console.error("Error fetching latest secondary stories:", error);
        return [];
    }

    return (data || []).map(item => item.article).filter(Boolean);
}

export async function getLatestSecondaryMiniCards(limit?: number) {
    // Optimized: Use cache for panel ID lookup, then single JOIN query
    const panelId = await getPanelIdByName("secondary_mini_cards");
    if (!panelId) return [];

    const { data, error } = await supabase
        .from("article_panels")
        .select(`
            article:article_id(*)
        `)
        .eq("panel_id", panelId)
        .eq("article.status", "published")
        .order("created_at", { ascending: false })
        .limit(limit || 4);

    if (error) {
        console.error("Error fetching latest secondary mini cards:", error);
        return [];
    }

    return (data || []).map(item => item.article).filter(Boolean);
}

export async function getHomePageData() {
    const primaryFeature = await getLatestPrimaryArticle();
    const primaryStories = await getLatestPrimaryStories();
    const secondaryTopStories = await getLatestSecondaryTopStories();
    const secondaryStories = await getLatestSecondaryStories();
    const secondaryMiniCards = await getLatestSecondaryMiniCards();

    return {
        primaryPanel: {
            feature: primaryFeature,
            stories: primaryStories,
        },
        secondaryPanel: {
            topStories: secondaryTopStories,
            stories: secondaryStories,
            miniCards: secondaryMiniCards,
        }
    };     
}

export async function saveArticleToUser(userId: string, articleId: string) {
    const { error } = await supabase        
        .from("saved_articles")
        .insert({ user_id: userId, article_id: articleId });

    if (error) {
        console.error("Error saving article for user:", error);
        return error;
    }

    return { success: true };
}

export async function isArticleSaved(userId: string, articleId: string) {
    try {
        const { data, error } = await supabase
            .from("saved_articles")
            .select("id")
            .eq("user_id", userId)
            .eq("article_id", articleId)
            .single();

        if (error) {
            if ((error as any).code === "PGRST116") {
                // No rows found (single() returns 406-like error in some setups) — treat as not saved
                return false;
            }
            console.error("Error checking saved article:", error);
            return false;
        }

        return !!(data && data.id);
    } catch (err) {
        console.error("isArticleSaved unexpected error:", err);
        return false;
    }
}
