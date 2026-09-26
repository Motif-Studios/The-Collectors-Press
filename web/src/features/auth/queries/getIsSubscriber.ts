import { cache } from "react";
import { API_BASE_URL, API_BASE_URL_SERVER } from "@/lib/env";
import { fetchWithTimeout } from "@/lib/fetchWithTimeout";

// cache() dedupes calls within one server render (e.g. layout + page both asking)
export const getIsSubscriber = cache(async (userId: string | undefined) => {
    // Logged-out visitors can't be subscribers, so skip the API round trip entirely
    if (!userId) return { is_subscriber: false };

    const baseUrl = typeof window === "undefined" ? API_BASE_URL_SERVER : API_BASE_URL;

    try {
        const subscriberCheck = await fetchWithTimeout(`${baseUrl}/account/is_subscriber`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ user_id: userId }),
                timeout: 5000,
        });
        const subscriberData = await subscriberCheck.json();

        if (!subscriberCheck.ok) {
            return { error: subscriberData?.error ?? "Fail to check subscription status" };
        }

        return subscriberData;
    } catch {
        // A slow or unreachable API shouldn't block the whole page from rendering
        return { error: "Fail to check subscription status" };
    }
});


export async function getIsSubscribed(userId: string | undefined) {
    if (!userId) return { is_subscribed: false }; // Quick safety check

    const baseUrl = typeof window === "undefined" ? API_BASE_URL_SERVER : API_BASE_URL;
    
    // Pass user_id as a URL query parameter instead of a POST body
    const subscriberCheck = await fetch(`${baseUrl}/account/is_subscribed?user_id=${encodeURIComponent(userId)}`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
        },
    });

    // Move the .ok check BEFORE parsing .json() so HTML pages don't crash your app
    if (!subscriberCheck.ok) {
        return { error: "Fail to check subscription status" };
    }

    const subscriberData = await subscriberCheck.json();
    return subscriberData;
}