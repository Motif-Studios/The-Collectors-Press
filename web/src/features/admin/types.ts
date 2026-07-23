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
    status: "draft" | "submitted" | "rejected" | "published" | "archived";
    category: string;
    updatedAtLabel: string;
    authorName: string;
    rejectionReason?: string;
  }>;
  publishedArticles: Array<{
    id: string;
    title: string;
    slug: string;
    status: "draft" | "submitted" | "rejected" | "published" | "archived";
    category: string;
    updatedAtLabel: string;
    authorName: string;
    rejectionReason?: string;
  }>;
  allArticles: Array<{
    id: string;
    title: string;
    slug: string;
    status: "draft" | "submitted" | "rejected" | "published" | "archived";
    category: string;
    updatedAtLabel: string;
    authorName: string;
    rejectionReason?: string;
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
