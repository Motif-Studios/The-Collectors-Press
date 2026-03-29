import type { ReactNode } from "react";
import { Header } from "@/components/ui/header/Header";

const homepageNavItems = [
  { label: "Home", isActive: true },
  { label: "Latest news" },
  { label: "Herald NOW" },
  { label: "Video" },
  { label: "New Zealand" },
  { label: "Sport" },
  { label: "World" },
  { label: "Business" },
  { label: "Entertainment" },
  { label: "Podcasts" },
  { label: "Quizzes" },
  { label: "Opinion" },
  { label: "Lifestyle" },
  { label: "Travel" },
  { label: "Viva" },
  { label: "Weather" },
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
    </>
  );
}