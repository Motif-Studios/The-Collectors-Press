import type { ReactNode } from "react";
import { AccountHeader } from "@/components/ui/header/AccountHeader";
import { AccountFooter } from "@/components/ui/account_footer/AccountFooter";
import { AccountSidebarNav } from "@/components/ui/account_sidebar_nav/AccountSidebarNav";
import { LogoutFeedbackBanner, LogoutFeedbackProvider } from "@/components/ui/logout_feedback/LogoutFeedback";
import { getCurrentUser } from "@/features/auth/queries/getCurrentUser";

export default async function AccountLayout({ children }: { children: ReactNode }) {
  const user = (await getCurrentUser()) ?? { name: "User", id: "" };

  return (
    <LogoutFeedbackProvider>
      <div className="flex min-h-screen flex-col">
        <AccountHeader user={user} isSubscriber={false} />
        <LogoutFeedbackBanner />

        <main className="flex-1 px-5 pt-6 pb-16 md:px-8 md:pt-7 md:pb-20">
          <div className="mx-auto grid max-w-[1220px] grid-cols-1 items-start gap-8 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-20">
            <aside className="pt-1">
              <AccountSidebarNav />
            </aside>

            <section className="max-w-full min-w-0 lg:max-w-[700px]">
              {children}
            </section>
          </div>
        </main>

        <AccountFooter />
      </div>
    </LogoutFeedbackProvider>
  );
}
