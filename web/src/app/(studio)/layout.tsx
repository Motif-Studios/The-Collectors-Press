import type { ReactNode } from "react";
import { StudioHeader } from "@/components/ui/header/StudioHeader";
import { AccountFooter } from "@/components/ui/account_footer/AccountFooter";
import { StudioSidebarNav } from "@/components/ui/studio_sidebar_nav/StudioSidebarNav";
import { LogoutFeedbackBanner, LogoutFeedbackProvider } from "@/components/ui/logout_feedback/LogoutFeedback";
import { getCurrentUser } from "@/features/auth/queries/getCurrentUser";

export default async function StudioLayout({ children }: { children: ReactNode }) {
  const user = (await getCurrentUser()) ?? { name: "User", id: "" };

  return (
    <LogoutFeedbackProvider>
      <div className="flex min-h-screen flex-col">
        <StudioHeader user={user} />
        <LogoutFeedbackBanner />
        <main className="flex-1 px-5 pt-6 pb-16 md:px-8 md:pt-7 md:pb-20">
          <div className="mx-auto grid max-w-305 grid-cols-1 items-start gap-8 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-20">
            <aside className="pt-1">
              <StudioSidebarNav />
            </aside>

            {/* <main className="max-w-full min-w-0 lg:max-w-[700px]"> */}
            <main>
              {children}
            </main>
          </div>
        </main>

        <AccountFooter />
      </div>
    </LogoutFeedbackProvider>
  );
}
