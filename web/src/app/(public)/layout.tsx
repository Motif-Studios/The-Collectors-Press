import { Header } from "@/components/ui/header/Header";
import { Footer } from "@/components/ui/footer/Footer";
import { ReactNode } from "react";

import { getCurrentUser } from "@/features/auth/queries/getCurrentUser";
import { getIsSubscriber } from "@/features/auth/queries/getIsSubscriber";
import { LogoutFeedbackBanner, LogoutFeedbackProvider } from "@/components/ui/logout_feedback/LogoutFeedback";

const homepageNavItems = [
  { label: "Home", isActive: true, href: "/" },
  { label: "Pokémon", href: "/category/pokemon" },
  { label: "One Piece", href: "/category/one-piece" },
  { label: "Basketball", href: "/category/basketball" },
  // { label: "American Football", href: "/category/american-football" },
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
  const subscriberInfo = await getIsSubscriber(handleUser?.id);
  // Authors and admins always have Studio access, treat them as subscribers for nav purposes
  const isAuthorOrAdmin = handleUser?.userType === "author" || handleUser?.userType === "admin";
  const isSubscriber = !!subscriberInfo?.is_subscriber || isAuthorOrAdmin;

  return (
    <LogoutFeedbackProvider>
      <div className="flex min-h-screen flex-col">
        <Header
          navItems={homepageNavItems}
          user={handleUser}
          isSubscriber={isSubscriber}
          canAccessStudio={isAuthorOrAdmin}
        />

        <LogoutFeedbackBanner />

        <main className="flex-1">{children}</main>

        <Footer />
      </div>
    </LogoutFeedbackProvider>
  );
}
