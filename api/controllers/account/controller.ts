import { supabase } from "../../lib/supabase";
import Stripe from "stripe";

const stripeSecretKey = process.env.sk_test;
if (!stripeSecretKey) {
  throw new Error("Missing STRIPE_SECRET_KEY environment variable");
}
const stripe = new Stripe(stripeSecretKey);

export async function cancelAccountSubscription(userId: string) {
  const { data: subscription, error: findError } = await supabase
    .from("subscription")
    .select("id, stripe_subscription_id")
    .eq("user_id", userId)
    .maybeSingle();

  if (findError) {
    console.error("Error fetching subscription:", findError);
    throw new Error("Failed to find subscription");
  }

  if (!subscription) {
    throw new Error("Subscription not found");
  }

  if (subscription.stripe_subscription_id) {
    await stripe.subscriptions.cancel(subscription.stripe_subscription_id);
  }
}

export async function isSubscribed(userId: string): Promise<boolean> {
  const { data: subscription, error } = await supabase
    .from("subscription")
    .select("id, subscription_status")
    .eq("user_id", userId)
    .maybeSingle();

    if (error) {
      console.error("Error checking subscription:", error);
      return false;
    }

  return subscription?.subscription_status === "active";
}