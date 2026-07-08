import { supabase } from "../../lib/supabase";

export async function handleSearchQuery(searchQuery: string) {
    const searchTerm = decodeURIComponent(searchQuery);

    // Optimized: Combined single query instead of 2 separate queries
    const { data, error } = await supabase
        .from("article")
        .select(`
            *,
            article_categories!inner(
                category!inner(category_name)
            )
        `, { count: "exact" })
        .or(`title.ilike.%${searchTerm}%,preview_text.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)
        .limit(100);

    if (error) {
        console.error("Error handling search query:", error);
        return error;
    }

    // If no results with category join, also search by text alone
    if (!data || data.length === 0) {
        const { data: textData, error: textError } = await supabase
            .from("article")
            .select("*")
            .or(`title.ilike.%${searchTerm}%,preview_text.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)
            .limit(100);
        
        return textError ? textError : textData || [];
    }

    return data;
}   

export async function handleSearchCategory(categoryName: string) {
    // Optimized: Direct JOIN instead of separate query
    const { data, error } = await supabase
        .from("article")
        .select(`*, article_categories!inner(category!inner(category_id, category_name))`)
        .eq("article_categories.category.category_name", categoryName)
        .limit(100);
    
    if (error) {
        console.error("Error fetching articles by category name:", error);
        return error;
    }

    return data || [];
}

export async function handleSearchCategoryAndQuery(categoryName: string, searchQuery: string) {
    const searchTerm = decodeURIComponent(searchQuery);
    
    // Optimized: Single query with both filters
    const { data, error } = await supabase
        .from("article")
        .select(`*, article_categories!inner(category!inner(category_id, category_name))`)
        .eq("article_categories.category.category_name", categoryName)
        .or(`title.ilike.%${searchTerm}%,preview_text.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`, { referencedTable: "article" })
        .limit(100);

    if (error) {
        console.error("Error fetching articles by category name and search query:", error);
        return error;
    }
    
    return data || [];
}

export async function handleSearchCategories() {
    const { data, error } = await supabase
        .from("category")
        .select("*")
        .limit(100);
    if (error) {
        console.error("Error fetching categories:", error);
        return error;
    }
    return data || [];
}