import { Header } from "@/components/ui/header/Header";
import { Footer } from "@/components/ui/footer/Footer";
import { ReactNode } from "react";

import { getCurrentUser } from "@/features/auth/queries/getCurrentUser";

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

export default async function PublicLayout({
  children,
}: {
  children: ReactNode;
}) {
  const handleUser = await getCurrentUser();

  return (
    <>
      <Header
        navItems={homepageNavItems}
        user={handleUser}
        isSubscriber={false}
      />

      <main>{children}</main>

      <Footer />
    </>
  );
}
