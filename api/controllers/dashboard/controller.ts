import { supabase } from "../../lib/supabase";

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