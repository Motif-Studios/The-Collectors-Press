import { createClient } from "@/lib/supabase/server";
import { API_BASE_URL_SERVER } from "@/lib/env";

type CurrentUser = {
    name: string;
    id: string;
    userType: string;
};

export async function getCurrentUser() {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();

    console.log("Current user data:", data.user?.id);

    if (!data.user) {
        return null;
    }

    let userType = "normal";

    try {
        const profileUrl = `${API_BASE_URL_SERVER}/auth/profile/${data.user.id}`;
        console.log("Fetching profile from:", profileUrl);
        const profileResponse = await fetch(profileUrl);

        console.log("Profile response status:", profileResponse.status);

        if (profileResponse.ok) {
            const profile = await profileResponse.json() as { user_type?: string };
            console.log("Profile data:", profile);
            userType = profile?.user_type ?? "normal";
        } else {
            const errorText = await profileResponse.text();
            console.error("Profile fetch error:", profileResponse.status, errorText);
        }
    } catch (error) {
        console.error("Error fetching current user profile:", error);
    }

    console.log("Final user type:", userType);

    const currentUser: CurrentUser = {
        name: data.user.email || "User",
        id: data.user.id,
        userType,
    };

    return currentUser;
}


