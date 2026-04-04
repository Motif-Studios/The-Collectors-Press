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

export async function getArticleByCategoryName(categoryName: string) {
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

    return articlesData;
}