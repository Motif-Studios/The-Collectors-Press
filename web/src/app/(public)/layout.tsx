import { Header } from "@/components/ui/header/Header";
import { Footer } from "@/components/ui/footer/Footer";
import { ReactNode, Suspense } from "react";

import { getAuthUser, getCurrentUser } from "@/features/auth/queries/getCurrentUser";
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

// Fetches the user-specific bits of the header. Lives in its own Suspense boundary so a
// slow profile/subscription lookup never blocks the rest of the page from rendering.
async function PublicHeader() {
  const authUser = await getAuthUser();
  // Profile and subscription lookups only need the user id, so run them side by side
  const [handleUser, subscriberInfo] = await Promise.all([
    getCurrentUser(),
    getIsSubscriber(authUser?.id),
  ]);
  // Authors and admins always have Studio access, treat them as subscribers for nav purposes
  const isAuthorOrAdmin = handleUser?.userType === "author" || handleUser?.userType === "admin";
  const isSubscriber = !!subscriberInfo?.is_subscriber || isAuthorOrAdmin;

  return (
    <Header
      navItems={homepageNavItems}
      user={handleUser}
      isSubscriber={isSubscriber}
      canAccessStudio={isAuthorOrAdmin}
    />
  );
}

export default function PublicLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <LogoutFeedbackProvider>
      <div className="flex min-h-screen flex-col">
        <Suspense fallback={<Header navItems={homepageNavItems} accountPending />}>
          <PublicHeader />
        </Suspense>

        <LogoutFeedbackBanner />

        <main className="flex-1">{children}</main>

        <Footer />
      </div>
    </LogoutFeedbackProvider>
  );
}
