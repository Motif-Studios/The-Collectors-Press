import type { SearchPageData } from "@/features/search/types";

const mockArticles: SearchPageData = [
  {
    id: "1",
    title: "Why Cities Are Rethinking Public Transport",
    summary: "Urban planning is shifting toward greener systems.",
    author: "Amelia Hart",
    date: "March 14, 2026",
    caption: "Illustration by The Atlantic. Sources: Al D...",
    imageSrc:
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=900&q=80",
    imageAlt: "City",
    href: "#",
  },
  {
    id: "2",
    title: "The Return of Long-Form Writing",
    summary: "People are slowing down and reading more deeply.",
    author: "Daniel Cho",
    date: "March 12, 2026",
    caption: "Illustration by The Atlantic. Sources: Al D...",
    imageSrc:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Writing",
    href: "#",
  },
  {
    id: "3",
    title: "Design Systems Are Changing Media",
    summary: "Reusable UI is shaping modern editorial platforms.",
    author: "Priya Shah",
    date: "March 10, 2026",
    caption: "Illustration by The Atlantic. Sources: Al D...",
    imageSrc:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Design",
    href: "#",
  },
];

export async function getMockSearchPageData(
  searchQuery: string,
): Promise<SearchPageData> {
  const query = searchQuery.trim().toLowerCase();

  if (!query) {
    return [];
  }

  return mockArticles.filter((article) => {
    const searchableText = [
      article.title,
      article.summary,
      article.author,
      article.caption,
    ]
      .join(" ")
      .toLowerCase();

    return searchableText.includes(query);
  });
}