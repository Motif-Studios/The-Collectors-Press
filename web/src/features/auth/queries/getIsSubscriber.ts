import { API_BASE_URL, API_BASE_URL_SERVER } from "@/lib/env";

export async function getIsSubscriber(userId: string|undefined) {
    const baseUrl = typeof window === "undefined" ? API_BASE_URL_SERVER : API_BASE_URL;
    const subscriberCheck = await fetch(`${baseUrl}/account/is_subscriber`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ user_id: userId }),
    });
    const subscriberData = await subscriberCheck.json();

    if (!subscriberCheck.ok) {
        return { error: subscriberData?.error ?? "Fail to check subscription status" };
    }

    return subscriberData;
}


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