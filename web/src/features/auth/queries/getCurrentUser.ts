import { createClient } from "@/lib/supabase/server";

export async function getCurrentUser() {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();

    console.log("Current user data:", data.user);

    return data.user
    ? { 
        name: data.user.email || "User",
        id: data.user.id,
     }
    : null;
}


