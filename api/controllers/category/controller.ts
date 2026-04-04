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