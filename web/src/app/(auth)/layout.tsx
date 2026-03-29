import type { ReactNode } from "react";
import { AuthHeader } from "@/components/ui/header/AuthHeader";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <AuthHeader />

      <main>{children}</main>
    </>
  );
}
