import type { ReactNode } from "react";
import { AuthHeader } from "@/components/ui/header/AuthHeader";
import { LogoutFeedbackBanner, LogoutFeedbackProvider } from "@/components/ui/logout_feedback/LogoutFeedback";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <LogoutFeedbackProvider>
      <AuthHeader />
      <LogoutFeedbackBanner />

      <main>{children}</main>
    </LogoutFeedbackProvider>
  );
}
