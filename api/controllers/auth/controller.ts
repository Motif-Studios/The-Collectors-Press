import { supabase } from "../../lib/supabase";

export async function handleSearchQuery(searchQuery: string) {
    const searchTerm = decodeURIComponent(searchQuery);

    const { data, error } = await supabase
        .from("article")
        .select(`*, article_categories(category_id), category(category_name)`)
        .ilike("title", `%${searchTerm}%`)
        .or(`preview_text.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,category.category_name.ilike.%${searchTerm}%`);
 

    if (error) {
        console.error("Error handling search query:", error);
        return error;
    }
    return data;
}