import { supabase } from "../../lib/supabase";
import Stripe from "stripe";

const stripeSecretKey = process.env.sk_test;
if (!stripeSecretKey) {
    throw new Error("Missing STRIPE_SECRET_KEY environment variable");
}
const stripe = new Stripe(stripeSecretKey);

export async function makeCustomerSubscriber(customerId: string, subscriptionId: string) {
    const plan_type = subscriptionId === "price_1TM6yzAcAGiNxdHjxrlslPCK" ? "monthly" : "yearly";

    const { data, error } = await supabase
        .from("subscription")
        .update({ subscription_status: "active", plan_type: plan_type, stripe_subscription_id: subscriptionId, updated_at: new Date() })
        .eq("stripe_customer_id", customerId)
        
    if(error) {
        console.error("Error updating subscription status:", error);
        throw new Error("Failed to update subscription status");
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