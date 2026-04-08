import type { SavedStoriesPageData } from "@/features/saved_stories/types";

const mockSavedStories: SavedStoriesPageData = [
  {
    id: "1",
    title: "Why Cities Are Rethinking Public Transport",
    author: "Amelia Hart",
    imageSrc: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df",
    imageAlt: "City",
    href: "#",
  },
  {
    id: "2",
    title: "The Return of Long-Form Writing",
    author: "Daniel Cho",
    imageSrc: "https://images.unsplash.com/photo-1455390582262-044cdead277a",
    imageAlt: "Writing",
    href: "#",
  },
  {
    id: "3",
    title: "Design Systems Are Changing Media",
    author: "Priya Shah",
    imageSrc: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
    imageAlt: "Design",
    href: "#",
  },

  {
    id: "4",
    title: "Inside the Rise of Indie Hackers",
    author: "Leo Martins",
    imageSrc: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    imageAlt: "Coding",
    href: "#",
  },
  {
    id: "5",
    title: "Why Minimalism Is Back",
    author: "Nina Kapoor",
    imageSrc: "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
    imageAlt: "Minimal desk",
    href: "#",
  },
];

export async function getMockSavedStoriesPageData(): Promise<SavedStoriesPageData> {
  return mockSavedStories;
}
