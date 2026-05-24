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