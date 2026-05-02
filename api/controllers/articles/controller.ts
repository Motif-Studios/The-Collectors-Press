import { supabase } from "../../lib/supabase";

export async function getAllArticles() {
    const { data, error } = await supabase
        .from("article")
        .select("*");
    if (error) {
        console.error("Error fetching all articles:", error);
        return error;
    }
    return data;
}

export async function getArticleByCategoryName(categoryName: string, limit?: number, offset?: number) {
    const { data: categoryData, error: categoryError } = await supabase
        .from("category")
        .select("category_id")
        .eq("category_name", categoryName)
        .single();

    if (categoryError) {
        console.error("Error fetching category ID by name:", categoryError);
        return categoryError;
    }

    const { data, error } = await supabase
        .from("article_categories")
        .select("article_id")
        .eq("category_id", categoryData.category_id);
    if (error) {
        console.error("Error fetching articles by category name:", error);
        return error;
    }


    const { data: articlesData, error: articlesError } = await supabase
        .from("article")
        .select("*")
        .in("article_id", data.map((item) => item.article_id));

    if (articlesError) {
        console.error("Error fetching articles by category name:", articlesError);
        return articlesError;
    }

    if(limit && offset) {
        const paginatedData = articlesData.slice(offset, offset + limit);
        return paginatedData;
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
        // .select("*, profiles(id, user_type)")
        .eq("slug", decodedSlug)
        .single();
    
    if (error) {
        console.error("Error fetching article by slug:", error);
        return error;
    }

   // transform data
    // if (data) {
    //     const authorId = data.author_id || "unknown-author";
    //     return {
    //         ...data,
    //         author: {
    //             id: authorId,
    //             name: authorId, // Fallback: use author_id as name until profiles has name field
    //             description: "",
    //             avatarSrc: `https://eu.ui-avatars.com/api/?name=${encodeURIComponent(String(authorId))}&size=250`,
    //             moreTopics: [],
    //         },
    //         body: data.content || { blocks: [] },
    //     };
    // }

    return null;
}

export async function getSavedArticles(userId: string) {
    const { data, error } = await supabase
        .from("saved_articles")
        .select("article_id")
        .eq("user_id", userId);

    if (error) {
        console.error("Error fetching saved articles for user:", error);
        return error;
    }

    if (!data || data.length === 0) {
        return [];
    }

    const { data: articlesData, error: articlesError } = await supabase
        .from("article")
        .select("*")
        .in("article_id", data.map((item) => item.article_id));

    if (articlesError) {
        console.error("Error fetching saved articles for user:", articlesError);
        return articlesError;
    }
    return articlesData;
}

export async function getLatestPrimaryArticle() {
    const { data, error } = await supabase
        .from("panels")
        .select("id")
        .eq("name", "primary_feature")
        .single();

    const { data: articleData, error: articleError } = await supabase
        .from("article_panels")
        .select("article_id")
        .eq("panel_id", data?.id)
        .order("created_at", { ascending: false })
        .single();

    const { data: article, error: articleFetchError } = await supabase
        .from("article")
        .select("*")
        .eq("article_id", articleData?.article_id)
        .single();
    
    if (error || articleError || articleFetchError) {
        console.error("Error fetching latest primary article:", error || articleError || articleFetchError);
        return error || articleError || articleFetchError;
    }

    return article;
}

export async function getLatestPrimaryStories(limit?: number) {
    const { data, error } = await supabase
        .from("panels")
        .select("id")
        .eq("name", "primary_stories")
        .single();

    const { data: articleData, error: articleError } = await supabase
        .from("article_panels")
        .select("article_id")
        .eq("panel_id", data?.id)
        .order("created_at", { ascending: false })
        .limit(limit || 3);
    
    const articleIds = articleData?.map((item) => item.article_id) || [];

    const { data: articles, error: articlesError } = await supabase
        .from("article")
        .select("*")
        .in("article_id", articleIds);

    if (error || articleError || articlesError) {
        console.error("Error fetching latest primary stories:", error || articleError || articlesError);
        return error || articleError || articlesError;
    }

    return articles;
}

export async function getLatestSecondaryTopStories(limit?: number) {
    const { data, error } = await supabase
        .from("panels")
        .select("id")
        .eq("name", "secondary_top_stories")
        .single();

    const { data: articleData, error: articleError } = await supabase
        .from("article_panels")
        .select("article_id")
        .eq("panel_id", data?.id)
        .order("created_at", { ascending: false })
        .limit(limit || 2);

    const articleIds = articleData?.map((item) => item.article_id) || [];

    const { data: articles, error: articlesError } = await supabase
        .from("article")
        .select("*")
        .in("article_id", articleIds);

    if (error || articleError || articlesError) {
        console.error("Error fetching latest secondary top stories:", error || articleError || articlesError);
        return error || articleError || articlesError;
    }

    return articles;
}

export async function getLatestSecondaryStories(limit?: number) {
    const { data, error } = await supabase
        .from("panels")
        .select("id")
        .eq("name", "secondary_stories")
        .single();

    const { data: articleData, error: articleError } = await supabase
        .from("article_panels")
        .select("article_id")
        .eq("panel_id", data?.id)
        .order("created_at", { ascending: false })
        .limit(limit || 4);

    const articleIds = articleData?.map((item) => item.article_id) || [];

    const { data: articles, error: articlesError } = await supabase
        .from("article")
        .select("*")
        .in("article_id", articleIds);
    
    if (error || articleError || articlesError) {
        console.error("Error fetching latest secondary stories:", error || articleError || articlesError);
        return error || articleError || articlesError;
    }

    return articles;
}

export async function getLatestSecondaryMiniCards(limit?: number) {
    const { data, error } = await supabase
        .from("panels")
        .select("id")
        .eq("name", "secondary_mini_cards")
        .single();

    const { data: articleData, error: articleError } = await supabase
        .from("article_panels")
        .select("article_id")
        .eq("panel_id", data?.id)
        .order("created_at", { ascending: false })
        .limit(limit || 4);

    const articleIds = articleData?.map((item) => item.article_id) || [];

    const { data: articles, error: articlesError } = await supabase
        .from("article")
        .select("*")
        .in("article_id", articleIds);

    if (error || articleError || articlesError) {
        console.error("Error fetching latest secondary mini cards:", error || articleError || articlesError);
        return error || articleError || articlesError;
    }
    return articles;
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
