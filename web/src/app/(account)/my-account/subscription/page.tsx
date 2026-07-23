import { redirect } from "next/navigation";
import { getCurrentUser } from "@/features/auth/queries/getCurrentUser";
import { getIsSubscriber } from "@/features/auth/queries/getIsSubscriber";
import { BillingManagementPageView } from "@/features/account_subscription/AccountSubscriptionPageView";

export default async function AccountSubscriptionPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const subscriberInfo = await getIsSubscriber(user.id);
  if (!subscriberInfo?.is_subscriber) {
    redirect("/my-account");
  }

  return <BillingManagementPageView userId={user.id} />;
}