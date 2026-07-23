import { createClient } from "@/lib/supabase/server";
import { API_BASE_URL_SERVER } from "@/lib/env";

type CurrentUser = {
    name: string;
    id: string;
    userType: string;
};

function normaliseUserType(raw: string | undefined) {
    const value = (raw ?? "normal").toLowerCase().trim();

    if (value === "author" || value === "aurthor") {
        return "author";
    }

    if (value === "admin") {
        return "admin";
    }

    return "normal";
}

export async function getCurrentUser() {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();

    if (!data.user) {
        return null;
    }

    let userType = "normal";

    try {
        const profileUrl = `${API_BASE_URL_SERVER}/auth/profile/${data.user.id}`;
        const profileResponse = await fetch(profileUrl);

        if (profileResponse.ok) {
            const profile = await profileResponse.json() as { user_type?: string };
            userType = normaliseUserType(profile?.user_type);
        }
    } catch (error) {
        console.error("Error fetching current user profile:", error);
    }

    const currentUser: CurrentUser = {
        name: data.user.email || "User",
        id: data.user.id,
        userType,
    };

    console.log("Current user:", currentUser.userType);

    return currentUser;
}


