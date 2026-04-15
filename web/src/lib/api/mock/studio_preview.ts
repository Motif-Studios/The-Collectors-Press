import type { Article } from "@/features/article/types";

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
    description:
      "Charlie Warzel is a staff writer at The Atlantic and the author of its newsletter Galaxy Brain, about technology, media, and big ideas. He can be reached via email.",
    avatarSrc: "https://eu.ui-avatars.com/api/?name=Kevin+Wu&size=250",
    moreTopics: ["Donald Trump", "Iran", "Middle East"],
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
        type: "image",
        data: {
          file: {
            url: "https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=1400&q=80",
          },
          caption:
            "A clean editorial workspace helps writers focus on storytelling, structure and flow.",
          withBorder: true,
          withBackground: true,
          stretched: true,
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
          meta: {},
          items: [
            {
              content: "Long-form paragraphs for reporting and analysis",
              meta: {},
              items: [],
            },
            {
              content: "Section headings to break up the story",
              meta: {},
              items: [],
            },
            {
              content: "Images with captions and credits",
              meta: {},
              items: [],
            },
            {
              content: "Embedded video or social posts",
              meta: {},
              items: [],
            },
            {
              content: "Pull quotes to highlight key moments",
              meta: {},
              items: [],
            },
            {
              content: "Lists for summaries, timelines or takeaways",
              meta: {},
              items: [],
            },
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

export async function getMockArticlePreviewData(
  draftId: string,
): Promise<Article> {
  console.log("GET PREVIEW DRAFT:", draftId);

  return {
    ...mockArticle,
    id: draftId,
    status: "draft",
  };
}
