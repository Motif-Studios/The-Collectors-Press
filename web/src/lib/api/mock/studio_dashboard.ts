import type {
  StudioArticleRow,
  StudioDashboardData,
  StudioDashboardSummary,
} from "@/features/dashboard/types";

const mockArticles: StudioArticleRow[] = [
  {
    id: "1",
    title:
      "How small independent newsrooms are redesigning the reading experience",
    slug: "/news/independent-newsrooms-reading-experience",
    status: "draft",
    category: "News",
    updatedAtLabel: "2 minutes ago",
    authorName: "Kevin Wu",
    secondaryActionLabel: "Preview",
  },
  {
    id: "2",
    title: "The future of long-form journalism in a fast-scroll world",
    slug: "/opinion/future-of-long-form-journalism",
    status: "published",
    category: "Opinion",
    updatedAtLabel: "Yesterday",
    authorName: "Kevin Wu",
    secondaryActionLabel: "View",
  },
  {
    id: "3",
    title: "Designing calmer article pages for modern readers",
    slug: "/culture/designing-calmer-article-pages",
    status: "published",
    category: "Culture",
    updatedAtLabel: "3 days ago",
    authorName: "Kevin Wu",
    secondaryActionLabel: "Preview",
  },
  {
    id: "4",
    title: "Why every publication needs a better media workflow",
    slug: "/technology/better-media-workflow",
    status: "draft",
    category: "Technology",
    updatedAtLabel: "1 week ago",
    authorName: "Kevin Wu",
    secondaryActionLabel: "Restore",
  },
];

const mockSummary: StudioDashboardSummary = {
  totalArticles: 24,
  drafts: 8,
  submitted: 0,
  rejected: 0,
  published: 13,
  archived: 3,
};

export async function getMockStudioDashboardData(): Promise<StudioDashboardData> {
  return {
    summary: mockSummary,
    articles: mockArticles,
  };
}