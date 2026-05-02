import type { ReactNode } from "react";
import { SubscribeHeader } from "@/components/ui/header/SubscribeHeader";
import { AccountFooter } from "@/components/ui/account_footer/AccountFooter";
import { getCurrentUser } from "@/features/auth/queries/getCurrentUser";
import { LogoutFeedbackBanner, LogoutFeedbackProvider } from "@/components/ui/logout_feedback/LogoutFeedback";

export default async function SubscribeLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getCurrentUser();

  return (
    <LogoutFeedbackProvider>
      <SubscribeHeader user={user} />
      <LogoutFeedbackBanner />

      <main>{children}</main>
      <AccountFooter />
    </LogoutFeedbackProvider>
  );
}