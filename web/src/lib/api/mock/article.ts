import type { Article, ArticleSecondaryPanelData } from "@/features/article/types";


export const mockArticle: Article = {
  id: "article-1",
  slug: "how-small-independent-newsrooms-are-redesigning-the-reading-experience",

  title:
    "How small independent newsrooms are redesigning the reading experience",

  subtitle:
    "Modern publishing tools are shifting how stories are structured, designed and consumed.",

  excerpt:
    "Modern news websites are no longer just about publishing text. Editors and writers now shape the entire reading experience through layout, imagery, embeds and pacing.",

  category: "Design",

  status: "published",

  publishedAt: "2026-04-01T09:00:00.000Z",
  updatedAt: "2026-04-01T09:00:00.000Z",

  author: {
    id: "author-1",
    name: "Kevin Wu",
    description: "Charlie Warzel is a staff writer at The Atlantic and the author of its newsletter Galaxy Brain, about technology, media, and big ideas. He can be reached via email.",
    avatarSrc: "https://eu.ui-avatars.com/api/?name=Kevin+Wu&size=250",
    moreTopics: ["Donald Trump", "Iran", "Middle East"]
  },

  coverImage: {
    src: "https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=1400&q=80",
    alt: "Editorial workspace",
    caption:
      "A clean editorial workspace helps writers focus on storytelling, structure and flow.",
  },

  body: {
    time: 1743480000000,
    version: "2.30.0",
    blocks: [
      {
        type: "paragraph",
        data: {
          text: "Modern news websites are no longer just about publishing text. Editors and writers now shape the entire reading experience through layout, imagery, embeds and pacing. The article page has become a designed product in its own right.",
        },
      },
      {
        type: "paragraph",
        data: {
          text: "For smaller publications, this creates an opportunity. With the right editor, writers can create stories that feel polished and immersive without needing to touch code.",
        },
      },
      {
        type: "simpleImage",
        data: {
          url: "https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=1400&q=80",
          caption:
            "A clean editorial workspace helps writers focus on storytelling, structure and flow.",
        },
      },
      {
        type: "header",
        data: {
          text: "What a good publishing experience should feel like",
          level: 2,
        },
      },
      {
        type: "paragraph",
        data: {
          text: "A strong article editor should feel calm and focused. Writers should be able to add a title, subtitle, cover image and article body without friction.",
        },
      },
      {
        type: "quote",
        data: {
          text: "The best editing tools disappear into the background and let the story take the lead.",
          caption: "Editorial design principle",
          alignment: "left",
        },
      },
      {
        type: "embed",
        data: {
          service: "youtube",
          source: "https://www.youtube.com/watch?v=aqz-KE-bpKQ",
          embed: "https://www.youtube.com/embed/aqz-KE-bpKQ",
          width: 580,
          height: 320,
          caption:
            "Embedded video can be used for interviews, explainers or supporting media.",
        },
      },
      {
        type: "header",
        data: {
          text: "Common content blocks for newsroom articles",
          level: 2,
        },
      },
      {
        type: "list",
        data: {
          style: "unordered",
          items: [
            "Long-form paragraphs for reporting and analysis",
            "Section headings to break up the story",
            "Images with captions and credits",
            "Embedded video or social posts",
            "Pull quotes to highlight key moments",
            "Lists for summaries, timelines or takeaways",
          ],
        },
      },
      {
        type: "paragraph",
        data: {
          text: "This mock editor demonstrates how an author could assemble all of those elements inside a single workspace.",
        },
      },
      {
        type: "header",
        data: {
          text: "Why this matters for the final website",
          level: 2,
        },
      },
      {
        type: "paragraph",
        data: {
          text: "A better editor leads to better-looking stories, faster publishing and a more professional newsroom workflow.",
        },
      },
    ],
  },
};

export async function getMockArticleBySlug(
  articleSlug: string,
): Promise<Article> {
  if (articleSlug !== mockArticle.slug) {
    throw new Error(`Mock article not found for slug: ${articleSlug}`);
  }

  return structuredClone(mockArticle);
}


export async function getMockArticleSecondaryPanelData(): Promise<ArticleSecondaryPanelData> {
  return {
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
