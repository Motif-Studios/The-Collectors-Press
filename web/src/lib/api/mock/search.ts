import type { SearchPageData } from "@/features/search/types";

const mockArticles: SearchPageData["articles"] = [
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

const mockCategories: SearchPageData["categories"] = [
  { id: "pokemon", name: "Pokémon", slug: "pokemon", href: "/category/pokemon" },
  { id: "one-piece", name: "One Piece", slug: "one-piece", href: "/category/one-piece" },
  { id: "basketball", name: "Basketball", slug: "basketball", href: "/category/basketball" },
  { id: "american-football", name: "American Football", slug: "american-football", href: "/category/american-football" },
  { id: "other", name: "Other", slug: "other", href: "/category/other" },
];

export async function getMockSearchPageData(
  searchQuery: string,
): Promise<SearchPageData> {
  const query = searchQuery.trim().toLowerCase();

  if (!query) {
    return { articles: mockArticles, categories: mockCategories };
  }

  const articles = mockArticles.filter((article) => {
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

  const categories = mockCategories.filter((category) =>
    category.name.toLowerCase().includes(query),
  );

  return { articles, categories };
}