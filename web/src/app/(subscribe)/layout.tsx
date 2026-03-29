import type { ReactNode } from "react";
import { SubscribeHeader } from "@/components/ui/header/SubscribeHeader";

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
    </>
  );
}