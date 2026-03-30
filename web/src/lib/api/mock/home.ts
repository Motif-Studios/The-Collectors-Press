import type { HomePageData } from "@/features/home/types";

export async function getMockHomePageData(): Promise<HomePageData> {
  return {
    primaryPanel: {
      feature: {
        id: "feature-1",
        imageSrc:
          "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80",
        imageAlt: "Featured story",
        type: "Opinion",
        section: "Chanticleer",
        title:
          "How this contrarian is betting against Australia’s great Ponzi scheme",
        summary:
          "Fund manager Martin Conlon says Australia’s economy is built on an unsustainable mix of high house prices and immigration.",
        href: "#",
      },
      stories: [
        {
          id: "1",
          kicker: "Sharemarket",
          title:
            "ASX publishing outage leads to market chaos and investor angst",
          summary:
            "Dozens of listed companies have been unable to issue updates all morning after the failure of the exchange's system, even with stocks trading as usual.",
          href: "#",
        },
        {
          id: "2",
          kicker: "Mergers & acquisitions",
          title:
            "AUB’s private equity suitors walk from $5b buyout of insurance broker",
          summary:
            "The company said EQT and CVC Capital Partners indicated they did not intend to proceed with a $45-per-share bid, and that it was confident in its strategy.",
          href: "#",
        },
        {
          id: "3",
          kicker: "Energy",
          title:
            "FIRB delays puts $100m energy retailer buyout on brink of collapse",
          summary:
            "TPC Consolidated had agreed to sell itself to Chinese government-backed Beijing Energy in March last year, but approval has not been forthcoming for 18 months.",
          href: "#",
        },
      ],
    },
    secondaryPanel: {
      topStories: [
        {
          id: "top-1",
          categories: ["Markets Live"],
          title: "Shares fall as ASX outage hits 80 stocks; bitcoin falls 4pc",
          summary:
            "ASX falls as market operator fixes announcements outage; Treasury Wine warns on US writedown.",
          imageSrc:
            "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=600&q=80",
          imageAlt: "Markets chart",
          href: "#",
        },
        {
          id: "top-2",
          categories: ["Need to Know"],
          title: "Marles to announce major defence overhaul",
          summary:
            "Richard Marles is poised to announce sweeping changes while other political and business updates continue.",
          imageSrc:
            "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=80",
          imageAlt: "Briefing room",
          href: "#",
        },
      ],
      stories: [
        {
          id: "story-1",
          categories: ["Industrial relations"],
          title:
            "Bullying, other psych claims push workers’ compo losses near $2b",
          summary:
            "Psychological injury is the source of almost one in four claims in the public sector in NSW.",
          href: "#",
        },
        {
          id: "story-2",
          categories: ["Wine & spirits"],
          title: "Penfolds owner Treasury Wine slashes value of US business",
          summary:
            "Sam Fischer, who started as chief executive in late October, is clearing the decks.",
          href: "#",
        },
        {
          id: "story-3",
          categories: ["Shares"],
          title:
            "Market rally to stall in 2026 as super funds shun Aussie shares",
          summary:
            "Institutional investors poured billions into the Australian sharemarket in recent years.",
          href: "#",
        },
        {
          id: "story-4",
          categories: ["Retail"],
          title: "Metcash first-half result savaged by lost tobacco sales",
          summary:
            "The company is the largest supplier to independent supermarkets in Australia.",
          href: "#",
        },
      ],
      miniCards: [
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
      ],
    },
  };
}
