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
  let content = raw.content as any;
  if (typeof content === "string") {
    try {
      content = JSON.parse(content);
    } catch {
      // leave as-is
    }
  }

  function findEditorJsContent(obj: any): any | null {
    if (!obj || typeof obj !== "object") return null;
    if (Array.isArray(obj.blocks)) return obj;

    for (const key of Object.keys(obj)) {
      const value = obj[key];
      if (value && typeof value === "object") {
        if (Array.isArray(value.blocks)) return value;
        // check one level deeper
        for (const k2 of Object.keys(value)) {
          const v2 = value[k2];
          if (v2 && typeof v2 === "object" && Array.isArray(v2.blocks)) return v2;
        }
      }
    }

    return null;
  }

  const unwound = raw.body ?? content ?? null;
  const found = findEditorJsContent(unwound);
  const articleBody = found ?? unwound ?? { blocks: [] };

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

    const normalized = normaliseArticle(articleRaw);

    return normalized;
  } catch (error) {
    return null;
  }
}

export async function getArticlePageData(articleCategory: string) {
  if (env.useMockApi) {
    return getMockArticleSecondaryPanelData(articleCategory);
  }

  return getArticleSecondaryPanelData(articleCategory);
}