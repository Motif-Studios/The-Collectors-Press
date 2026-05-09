import type { Article } from "./types";
import { getArticleSecondaryPanelData } from "@/lib/api/article";
import { getMockArticleBySlug, getMockArticleSecondaryPanelData } from "@/lib/api/mock/article";
import { env } from "@/lib/env";

type ApiArticle = {
  article_id?: string;
  slug?: string;
  title?: string;
  description?: string;
  preview_text?: string;
  status?: "draft" | "published" | "archived";
  created_at?: string;
  updated_at?: string;
  cover_image_url?: string;
  image_alt?: string;
  content?: Article["body"];
  body?: Article["body"];
  author?: Article["author"];
};

function normaliseArticle(raw: ApiArticle): Article {
  const articleBody = raw.body ?? raw.content ?? { blocks: [] };

  return {
    id: raw.article_id ?? "",
    slug: raw.slug ?? "",
    title: raw.title ?? "",
    subtitle: raw.description,
    excerpt: raw.preview_text,
    status: raw.status ?? "draft",
    publishedAt: raw.created_at,
    updatedAt: raw.updated_at,
    author: raw.author ?? {
      id: "unknown-author",
      name: "Unknown author",
      description: "",
      avatarSrc: "",
      moreTopics: [],
    },
    coverImage: raw.cover_image_url
      ? {
          src: raw.cover_image_url,
          alt: raw.image_alt ?? raw.title ?? "Article cover image",
        }
      : undefined,
    body: articleBody,
  };
}

export async function getArticleBySlug(articleSlug: string): Promise<Article | null> {
  if (env.useMockApi) {
    return getMockArticleBySlug(articleSlug);
  }

  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
    const response = await fetch(
      `${baseUrl}/api/articles/slug/${encodeURIComponent(articleSlug)}`
    );

    if (!response.ok) return null;

    const articleRaw = (await response.json()) as ApiArticle;

    if (!articleRaw || typeof articleRaw !== "object") {
      return null;
    }

    console.log("📄 Raw article from API:", {
      slug: articleRaw.slug,
      title: articleRaw.title,
      hasContent: !!articleRaw.content,
      hasBody: !!articleRaw.body,
      contentType: typeof articleRaw.content,
      contentBlocksCount: Array.isArray(articleRaw.content?.blocks) ? articleRaw.content.blocks.length : 0,
      bodyBlocksCount: Array.isArray(articleRaw.body?.blocks) ? articleRaw.body.blocks.length : 0,
      rawContent: articleRaw.content,
      rawBody: articleRaw.body,
    });

    const normalized = normaliseArticle(articleRaw);
    
    console.log("📄 Normalized article:", {
      id: normalized.id,
      title: normalized.title,
      bodyBlocksCount: normalized.body?.blocks?.length ?? 0,
      bodyBlocks: normalized.body?.blocks?.map(b => b.type),
    });

    return normalized;
  } catch (error) {
    console.error("❌ Error fetching article:", error);
    return null;
  }
}

export async function getArticlePageData(articleCategory: string) {
  if (env.useMockApi) {
    return getMockArticleSecondaryPanelData(articleCategory);
  }

  return getArticleSecondaryPanelData(articleCategory);
}