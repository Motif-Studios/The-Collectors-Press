import { API_BASE_URL } from "@/lib/env";

export async function newProfile(userId: string|undefined) {
    const newProfileResponse = await fetch(`${API_BASE_URL}/auth/create_profile`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ user_id: userId }),
    });
    const newProfileData = await newProfileResponse.json();

    if (!newProfileResponse.ok) {
        return { error: newProfileData?.error ?? "Email already in use" };
    }

    return newProfileData;
}