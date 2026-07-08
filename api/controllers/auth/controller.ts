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
        throw new Error("Email already in use");
    }  
    
    return data;
}

export async function getProfileByUserId(userId: string) {
    const { data, error } = await supabase
        .from("profiles")
        .select("id, user_type")
        .eq("id", userId)
        .maybeSingle();

    if (error) {
        console.error("Error fetching profile:", error);
        throw new Error("Failed to load profile");
    }

    return data;
}