import type { NotFoundPageData } from "@/features/not_found/types";

export async function getMockNotFoundPageData(): Promise<NotFoundPageData> {
  return [
        {
          id: "mini-1",
          category: "AI",
          title:
            "Are AI chefs the way of the future? This restaurant thinks so",
          imageSrc:
            "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80",
          imageAlt: "Restaurant kitchen",
          href: "#",
        },
        {
          id: "mini-2",
          category: "Luxury travel",
          title: "Why Christmas is the best time to visit Barcelona",
          imageSrc:
            "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=600&q=80",
          imageAlt: "Barcelona street",
          href: "#",
        },
        {
          id: "mini-3",
          category: "Luxury fashion",
          title: "The sway rebels against the NGV’s new blockbuster",
          imageSrc:
            "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=600&q=80",
          imageAlt: "Fashion portrait",
          href: "#",
        },
        {
          id: "mini-4",
          category: "Motorsport",
          title: "‘No words’: Piastri speechless at McLaren error as...",
          imageSrc:
            "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80",
          imageAlt: "Race car",
          href: "#",
        },
      ];
}
