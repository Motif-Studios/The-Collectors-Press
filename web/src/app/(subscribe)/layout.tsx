import type { ReactNode } from "react";
import { SubscribeHeader } from "@/components/ui/header/SubscribeHeader";
import { AccountFooter } from "@/components/ui/account_footer/AccountFooter";
import { getCurrentUser } from "@/features/auth/queries/getCurrentUser";

export default async function SubscribeLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getCurrentUser();

  return (
    <>
      <SubscribeHeader
        user={user}
      />

      <main>{children}</main>
      <AccountFooter />
    </>
  );
}