import { supabase } from "@/lib/supabase/client";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function changeEmail(newEmail: string) {
    const normalizedEmail = newEmail.trim().toLowerCase();

    if (!normalizedEmail) {
        return { error: "Email address is required." };
    }

    if (!EMAIL_REGEX.test(normalizedEmail)) {
        return { error: "Please enter a valid email address." };
    }

    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
        return { error: "No active session found. Please log in again." };
    }

    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
        return { error: userError.message };
    }

    const currentEmail = user?.email?.trim().toLowerCase();

    if (currentEmail && currentEmail === normalizedEmail) {
        return { error: "New email address must be different from your current email address." };
    }

    const { data, error } = await supabase.auth.updateUser({
        email: normalizedEmail,
    });

    if (error) {
        console.error("Change email error:", error);
        return { error: error.message };
    }

    console.log("Change email successful:", data);
    return { user: data.user };
} 