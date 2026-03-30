import type { ReactNode } from "react";
import { StudioHeader } from "@/components/ui/header/StudioHeader";

export default function StudioLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <StudioHeader user={{ name: "Motif" }} />

      <main>{children}</main>
    </>
  );
}