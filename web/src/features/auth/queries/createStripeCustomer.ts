import { API_BASE_URL } from "@/lib/env";

export async function createStripeCustomer(email: string) {    
    const stripeCustomerResponse = await fetch(`${API_BASE_URL}/subscription/create_customer`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
    });
    const stripeCustomerData = await stripeCustomerResponse.json();

    if (!stripeCustomerResponse.ok) {
        return { error: stripeCustomerData?.error ?? "Failed to create Stripe customer" };
    }

    return stripeCustomerData;
};