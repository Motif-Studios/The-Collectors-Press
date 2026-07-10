import type { ReactNode } from "react";
import { SubscribeHeader } from "@/components/ui/header/SubscribeHeader";
import { AccountFooter } from "@/components/ui/account_footer/AccountFooter";
import { getCurrentUser } from "@/features/auth/queries/getCurrentUser";
import { getIsSubscriber } from "@/features/auth/queries/getIsSubscriber";
import { LogoutFeedbackBanner, LogoutFeedbackProvider } from "@/components/ui/logout_feedback/LogoutFeedback";
import { redirect } from "next/navigation";

export default async function SubscribeLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getCurrentUser();
  const subscriberInfo = await getIsSubscriber(user?.id);
  const isSubscriber = !!subscriberInfo?.is_subscriber;

  if (isSubscriber) {
    redirect("/");
  }

  return (
    <LogoutFeedbackProvider>
      <SubscribeHeader user={user} isSubscriber={isSubscriber} />
      <LogoutFeedbackBanner />

      <main>{children}</main>
      <AccountFooter />
    </LogoutFeedbackProvider>
  );
}