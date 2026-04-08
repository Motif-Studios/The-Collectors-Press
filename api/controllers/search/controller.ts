import { supabase } from "../../lib/supabase";

export async function handleSearchQuery(searchQuery: string) {
    const searchTerm = decodeURIComponent(searchQuery);

    const { data, error } = await supabase
        .from("article")
        .select("*")
        .or(`title.ilike.%${searchTerm}%,preview_text.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`);
 

    const { data: categoryData, error: categoryError } = await supabase
        .from("article")
        .select(`*, article_categories!inner(category!inner(category_name))`)
        .ilike("article_categories.category.category_name", `%${searchTerm}%`);

    if (categoryError) {
        console.error("Error fetching articles by category name:", categoryError);
        return categoryError;
    }

    if (error) {
        console.error("Error handling search query:", error);
        return error;
    }

    const combinedData = [...(data || []), ...(categoryData || [])];
    const uniqueData = Array.from(new Map(combinedData.map(item => [item.article_id, item])).values());

    return uniqueData;
}   

export async function handleSearchCategory(categoryName: string) {
    const { data, error } = await supabase
        .from("article")
        .select(`*, article_categories!inner(category!inner(category_id, category_name))`)
        .eq("article_categories.category.category_name", categoryName);
    
    if (error) {
        console.error("Error fetching articles by category name:", error);
        return error;
    }

    return data;
}

export async function handleSearchCategoryAndQuery(categoryName: string, searchQuery: string) {
    const searchTerm = decodeURIComponent(searchQuery);
    const { data, error } = await supabase
        .from("article")
        .select(`*, article_categories!inner(category!inner(category_id, category_name))`)
        .eq("article_categories.category.category_name", categoryName)
        .or(`title.ilike.%${searchTerm}%,preview_text.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`, { referencedTable: "article" });

    if (error) {
        console.error("Error fetching articles by category name and search query:", error);
        return error;
    }
    
    return data;
}

export async function handleSearchCategories() {
    const { data, error } = await supabase
        .from("category")
        .select("*");
    if (error) {
        console.error("Error fetching categories:", error);
        return error;
    }
    return data;
}