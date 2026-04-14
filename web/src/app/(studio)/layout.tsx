import type { ReactNode } from "react";
import { StudioHeader } from "@/components/ui/header/StudioHeader";
import { AccountFooter } from "@/components/ui/account_footer/AccountFooter";
import { StudioSidebarNav } from "@/components/ui/studio_sidebar_nav/StudioSidebarNav";

export default function StudioLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <StudioHeader user={{ name: "Motif" }} />
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
  );
}
