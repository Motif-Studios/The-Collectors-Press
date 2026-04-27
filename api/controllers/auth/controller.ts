import { supabase } from "../../lib/supabase";

export async function createProfile(userId: string) {
    const { data, error } = await supabase
        .from("profiles")
        .insert({
            id: userId,
            user_type: "normal",
        })
        .select()
        .single();

    if (error) {
        console.error("Error creating profile:", error);
        throw new Error("Failed to create profile");
    }  
    
    return data;
}