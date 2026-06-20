import { API_BASE_URL } from "@/lib/env";

export async function createSubscriber(userId: string|undefined, email: string, customerId: string) {
    const newSubscriberResponse = await fetch(`${API_BASE_URL}/subscription/make_new_subscriber`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },        body: JSON.stringify({ userId, email, customerId }),
    });
    const newSubscriberData = await newSubscriberResponse.json();

    if (!newSubscriberResponse.ok) {
        return { error: newSubscriberData?.error ?? "Failed to create subscriber" };
    }

    return newSubscriberData;
}