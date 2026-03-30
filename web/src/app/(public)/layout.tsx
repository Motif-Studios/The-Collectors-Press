import type { ReactNode } from "react";
import { Header } from "@/components/ui/header/Header";
import { Footer } from "@/components/ui/footer/Footer";

const homepageNavItems = [
  { label: "Home", isActive: true, href: "/" },
  { label: "Pokémon", href: "/category/pokemon" },
  { label: "One Piece", href: "/category/one-piece" },
  { label: "Basketball", href: "/category/basketball" },
  { label: "American Football", href: "/category/american-football" },
  { label: "Other", href: "/category/other" },
  // { label: "Magic" },
  // { label: "Yu-Gi-Oh" },
  // { label: "Baseball" },
  // { label: "Football" },
];

export default function PublicLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <Header
        navItems={homepageNavItems}
        user={null}
        isSubscriber={false}
      />

      <main>{children}</main>

      <Footer />
    </>
  );
}