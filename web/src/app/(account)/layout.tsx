import type { ReactNode } from "react";
import { AccountHeader } from "@/components/ui/header/AccountHeader";

export default function AccountLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <AccountHeader
        user={{ name: "Motif" }}
        isSubscriber={false}
      />

      <main>{children}</main>
    </>
  );
}