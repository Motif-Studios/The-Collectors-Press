import { supabase } from "../../lib/supabase";

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