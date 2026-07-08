import type { AdminPanelName } from "@/lib/api/admin_dashboard";

export type { AdminPanelName };

export type AdminDashboardHomeCard = {
  id: string;
  title: string;
  href?: string;
};

export type AdminDashboardData = {
  queuedArticles: Array<{
    id: string;
    title: string;
    slug: string;
    status: "draft" | "submitted" | "published";
    category: string;
    updatedAtLabel: string;
    authorName: string;
  }>;
  publishedArticles: Array<{
    id: string;
    title: string;
    slug: string;
    status: "draft" | "submitted" | "published";
    category: string;
    updatedAtLabel: string;
    authorName: string;
  }>;
  homePage: {
    primaryPanel: {
      feature: AdminDashboardHomeCard;
      stories: AdminDashboardHomeCard[];
    };
    secondaryPanel: {
      topStories: AdminDashboardHomeCard[];
      stories: AdminDashboardHomeCard[];
      miniCards: AdminDashboardHomeCard[];
    };
  };
};
