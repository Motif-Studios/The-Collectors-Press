import { supabase } from "../../lib/supabase";

export async function getCategoriesByName(categoryName: string) {
    const { data, error } = await supabase
        .from("category")
        .select("*")
        .eq("category_name", categoryName)
        .single();

    if (error) {
        console.error("Error fetching category by name:", error);
        return error;
    }
    return data;
}

export async function getCategoryById(categoryId: number) {
    const { data, error } = await supabase
        .from("category")
        .select("*")
        .eq("id", categoryId)
        .single();
    
    if (error) {
        console.error("Error fetching category by ID:", error);
        return error;
    }
    return data;
}

export async function getCategoryByArticleId(articleId: string) {
    if (!articleId || articleId === "undefined") {
        return [];
    }

    const { data, error } = await supabase
        .from("article_categories")
        .select("category_id")
        .eq("article_id", articleId);
    
    if (error) {
        console.error("Error fetching category by article ID:", error);
        return error;
    }

    const categoryIds = data.map((item) => item.category_id);

    const { data: categoriesData, error: categoriesError } = await supabase
        .from("category")
        .select("*")
        .in("category_id", categoryIds);

    if (categoriesError) {
        console.error("Error fetching categories by article ID:", categoriesError);
        return categoriesError;
    }
    return categoriesData;
}

export async function getAllCategories() {
    const { data, error } = await supabase
        .from("category")
        .select("*");
        
    if (error) {
        console.error("Error fetching all categories:", error);
        return error;
    }
    return data;
}

export async function createCategory(categoryName: string) {
    const { data, error } = await supabase
        .from("category")
        .insert({ category_name: categoryName })
        .select("*")
        .single();

    if (error) {
        console.error("Error creating category:", error);
        return error;
    }
    return data;
}