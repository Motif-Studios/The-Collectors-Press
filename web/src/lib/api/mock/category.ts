import type { CategoryPageData } from "@/features/category/types";

const mockArticles: CategoryPageData = [
  {
    id: "1",
    title: "Why Cities Are Rethinking Public Transport",
    summary: "Urban planning is shifting toward greener systems.",
    author: "Amelia Hart",
    date: "March 14, 2026",
    caption: "Illustration by The Atlantic.",
    imageSrc:
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df",
    imageAlt: "City",
    href: "#",
  },
  {
    id: "2",
    title: "The Return of Long-Form Writing",
    summary: "People are slowing down and reading more deeply.",
    author: "Daniel Cho",
    date: "March 12, 2026",
    caption: "Illustration by The Atlantic.",
    imageSrc:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a",
    imageAlt: "Writing",
    href: "#",
  },
  {
    id: "3",
    title: "Design Systems Are Changing Media",
    summary: "Reusable UI is shaping modern editorial platforms.",
    author: "Priya Shah",
    date: "March 10, 2026",
    caption: "Illustration by The Atlantic.",
    imageSrc:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
    imageAlt: "Design",
    href: "#",
  },

  // --- NEW ONES BELOW ---

  {
    id: "4",
    title: "Inside the Rise of Indie Hackers",
    summary: "Solo builders are redefining entrepreneurship.",
    author: "Leo Martins",
    date: "March 9, 2026",
    caption: "Illustration by The Atlantic.",
    imageSrc:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    imageAlt: "Coding",
    href: "#",
  },
  {
    id: "5",
    title: "Why Minimalism Is Back",
    summary: "Design trends are shifting toward simplicity again.",
    author: "Nina Kapoor",
    date: "March 8, 2026",
    caption: "Illustration by The Atlantic.",
    imageSrc:
      "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
    imageAlt: "Minimal desk",
    href: "#",
  },
  {
    id: "6",
    title: "The Future of Remote Work",
    summary: "Companies rethink distributed teams.",
    author: "Ethan Cole",
    date: "March 7, 2026",
    caption: "Illustration by The Atlantic.",
    imageSrc:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
    imageAlt: "Remote work",
    href: "#",
  },
  {
    id: "7",
    title: "AI Is Changing Creativity",
    summary: "Artists are collaborating with machines.",
    author: "Sofia Nguyen",
    date: "March 6, 2026",
    caption: "Illustration by The Atlantic.",
    imageSrc:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
    imageAlt: "AI art",
    href: "#",
  },
  {
    id: "8",
    title: "Why Startups Fail Early",
    summary: "Most failures come down to product-market mismatch.",
    author: "Marcus Lee",
    date: "March 5, 2026",
    caption: "Illustration by The Atlantic.",
    imageSrc:
      "https://images.unsplash.com/photo-1559136555-9303baea8ebd",
    imageAlt: "Startup",
    href: "#",
  },
  {
    id: "9",
    title: "The Psychology of Productivity",
    summary: "Doing less might actually make you more productive.",
    author: "Olivia Brown",
    date: "March 4, 2026",
    caption: "Illustration by The Atlantic.",
    imageSrc:
      "https://images.unsplash.com/photo-1506784983877-45594efa4cbe",
    imageAlt: "Productivity",
    href: "#",
  },
  {
    id: "10",
    title: "How Gen Z Consumes Content",
    summary: "Short-form dominates, but depth is returning.",
    author: "Ravi Patel",
    date: "March 3, 2026",
    caption: "Illustration by The Atlantic.",
    imageSrc:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    imageAlt: "Social media",
    href: "#",
  },

  // second batch

  {
    id: "11",
    title: "The Evolution of UI Design",
    summary: "Interfaces are becoming more human.",
    author: "Clara Jensen",
    date: "March 2, 2026",
    caption: "Illustration by The Atlantic.",
    imageSrc:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    imageAlt: "UI design",
    href: "#",
  },
  {
    id: "12",
    title: "Why Storytelling Still Matters",
    summary: "Narratives shape how we understand the world.",
    author: "Tom Williams",
    date: "March 1, 2026",
    caption: "Illustration by The Atlantic.",
    imageSrc:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
    imageAlt: "Books",
    href: "#",
  },
  {
    id: "13",
    title: "The Rise of Micro-Startups",
    summary: "Small teams, big impact.",
    author: "Zara Khan",
    date: "Feb 28, 2026",
    caption: "Illustration by The Atlantic.",
    imageSrc:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
    imageAlt: "Startup team",
    href: "#",
  },
  {
    id: "14",
    title: "How APIs Power the Modern Web",
    summary: "Everything is connected behind the scenes.",
    author: "Alex Turner",
    date: "Feb 27, 2026",
    caption: "Illustration by The Atlantic.",
    imageSrc:
      "https://images.unsplash.com/photo-1518770660439-4636190af475",
    imageAlt: "Server",
    href: "#",
  },
  {
    id: "15",
    title: "The Simplicity Advantage",
    summary: "Simple products win more often.",
    author: "Emma Rossi",
    date: "Feb 26, 2026",
    caption: "Illustration by The Atlantic.",
    imageSrc:
      "https://images.unsplash.com/photo-1493612276216-ee3925520721",
    imageAlt: "Minimal UI",
    href: "#",
  },
  {
    id: "16",
    title: "Why Developers Love TypeScript",
    summary: "Types bring confidence to codebases.",
    author: "Noah Kim",
    date: "Feb 25, 2026",
    caption: "Illustration by The Atlantic.",
    imageSrc:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
    imageAlt: "Code",
    href: "#",
  },
  {
    id: "17",
    title: "The Future of Browsers",
    summary: "Browsers are becoming operating systems.",
    author: "Lucas Meyer",
    date: "Feb 24, 2026",
    caption: "Illustration by The Atlantic.",
    imageSrc:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    imageAlt: "Browser",
    href: "#",
  },
  {
    id: "18",
    title: "Why UX Matters More Than Ever",
    summary: "Experience is the new competitive edge.",
    author: "Aisha Rahman",
    date: "Feb 23, 2026",
    caption: "Illustration by The Atlantic.",
    imageSrc:
      "https://images.unsplash.com/photo-1559028012-481c04fa702d",
    imageAlt: "UX",
    href: "#",
  },
  {
    id: "19",
    title: "The Creator Economy Boom",
    summary: "Independent creators are building empires.",
    author: "Ben Carter",
    date: "Feb 22, 2026",
    caption: "Illustration by The Atlantic.",
    imageSrc:
      "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
    imageAlt: "Creator",
    href: "#",
  },
  {
    id: "20",
    title: "What Makes a Great Product",
    summary: "It’s not features — it’s clarity.",
    author: "Isabella Lopez",
    date: "Feb 21, 2026",
    caption: "Illustration by The Atlantic.",
    imageSrc:
      "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
    imageAlt: "Product",
    href: "#",
  },
];


export async function getMockCategoryPageData(
  categorySlug: string,
  limit = 10,
  offset = 0
): Promise<CategoryPageData> {
  return mockArticles.slice(offset, offset + limit);
}