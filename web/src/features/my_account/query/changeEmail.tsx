import { supabase } from "@/lib/supabase/client";

export async function changeEmail(newEmail: string) {
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
        return { error: "No active session found. Please log in again." };
    }

    const { data, error } = await supabase.auth.updateUser({
        email: newEmail,
    });

    if (error) {
        console.error("Change email error:", error);
        return { error: error.message };
    }

    console.log("Change email successful:", data);
    return { user: data.user };
} 