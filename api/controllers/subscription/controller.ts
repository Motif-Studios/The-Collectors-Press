import { supabase } from "../../lib/supabase";
import Stripe from "stripe";

const stripeSecretKey = process.env.sk_test;
if (!stripeSecretKey) {
    throw new Error("Missing STRIPE_SECRET_KEY environment variable");
}
const stripe = new Stripe(stripeSecretKey);

export async function makeCustomerSubscriber(customerId: string | undefined, subscriptionId: string, priceId: string, userId?: string) {
    const plan_type = priceId === "price_1TM6yzAcAGiNxdHjxrlslPCK" ? "monthly" : "yearly";

    let query = supabase
        .from("subscription")
        .update({ subscription_status: "active", plan_type: plan_type, stripe_subscription_id: subscriptionId, updated_at: new Date() });

    if (customerId) {
        query = query.eq("stripe_customer_id", customerId);
    } else if (userId) {
        query = query.eq("user_id", userId);
    } else {
        throw new Error("Cannot activate subscription without customerId or userId");
    }

    const { data, error } = await query
        .select("id, user_id, stripe_customer_id, subscription_status")
        .maybeSingle();
        
    if(error) {
        console.error("Error updating subscription status:", error);
        throw new Error("Failed to update subscription status");
    }

    if (!data) {
        throw new Error("No subscription row found to activate");
    }

    return data;
}

export async function createNewSubscriber(userId: string, email: string, customerId: string) {
    const { data, error } = await supabase
        .from("subscription")
        .insert({
            user_id: userId,
            email,
            subscription_status: "incomplete",
            stripe_customer_id: customerId,
            created_at: new Date(),
            updated_at: new Date(),
        })
        .select()
        .single();

    if (error) {
        console.error("Error creating subscription record:", error);
        throw new Error("Failed to create subscription record");
    }

    return data;
}

export async function createStripeCustomer(email: string) {
    const customer = await stripe.customers.create({
        email,
    });
    return customer;
}

export async function handleSubscriptionCancellation(subscription: string) {
    const { data, error } = await supabase
        .from("subscription")
        .update({ subscription_status: "canceled", updated_at: new Date() })
        .eq("stripe_subscription_id", subscription);
    
    if (error) {
        console.error("Error updating subscription status on cancellation:", error);
        throw new Error("Failed to update subscription status on cancellation");
    }

    return data;
}

export async function handleSubscriptionRenewal(subscription: string) {
    const { data, error } = await supabase
        .from("subscription")
        .update({ subscription_status: "active", updated_at: new Date() })
        .eq("stripe_subscription_id", subscription);
    
    if (error) {
        console.error("Error updating subscription status on renewal:", error);
        throw new Error("Failed to update subscription status on renewal");
    }

    return data;
}

export async function handleSubscriptionPaymentFailed(subscription: string) {
    const { data, error } = await supabase
        .from("subscription")
        .update({ subscription_status: "past_due", updated_at: new Date() })
        .eq("stripe_subscription_id", subscription);

    if (error) {
        console.error("Error updating subscription status on payment failure:", error);
        throw new Error("Failed to update subscription status on payment failure");
    }

    return data;
}