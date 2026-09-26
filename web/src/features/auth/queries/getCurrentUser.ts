import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import { API_BASE_URL_SERVER } from "@/lib/env";
import { fetchWithTimeout } from "@/lib/fetchWithTimeout";

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

// cache() dedupes calls within one server render (layout + page often both need the user)
// Just the Supabase session check (no API call), so callers can start other
// user-dependent requests in parallel with the profile lookup below
export const getAuthUser = cache(async () => {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    return data.user;
});

export const getCurrentUser = cache(async () => {
    const authUser = await getAuthUser();
    const data = { user: authUser };

    if (!data.user) {
        return null;
    }

    let userType = "normal";

    try {
        const profileUrl = `${API_BASE_URL_SERVER}/auth/profile/${data.user.id}`;
        const profileResponse = await fetchWithTimeout(profileUrl, { timeout: 5000 });

        if (profileResponse.ok) {
            const profile = await profileResponse.json() as { user_type?: string };
            userType = normaliseUserType(profile?.user_type);
        }
    } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
            console.warn(`Profile lookup timed out (${API_BASE_URL_SERVER}), using default user type`);
        } else {
            console.error("Error fetching current user profile:", error);
        }
    }

    const currentUser: CurrentUser = {
        name: data.user.email || "User",
        id: data.user.id,
        userType,
    };

    // console.log("Current user:", currentUser.userType);

    return currentUser;
});


