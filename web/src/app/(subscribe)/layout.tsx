import type { ReactNode } from "react";
import { SubscribeHeader } from "@/components/ui/header/SubscribeHeader";
import { AccountFooter } from "@/components/ui/account_footer/AccountFooter";

export default function SubscribeLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <SubscribeHeader
        user={null}
      />

      <main>{children}</main>
      <AccountFooter />
    </>
  );
}