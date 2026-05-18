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

function parseMaybeJson(value: unknown): unknown {
  if (typeof value !== "string") return value;

  try {
    return JSON.parse(value) as unknown;
  } catch {
    return value;
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isEditorJsContent(value: unknown): value is Article["body"] {
  return isRecord(value) && Array.isArray(value.blocks);
}

function normaliseArticle(raw: ApiArticle): Article {
  const content = parseMaybeJson(raw.content);
  const body = parseMaybeJson(raw.body);

  function findEditorJsContent(obj: unknown): Article["body"] | null {
    if (isEditorJsContent(obj)) return obj;

    if (!isRecord(obj)) return null;

    for (const key of Object.keys(obj)) {
      const value = obj[key];
      if (isEditorJsContent(value)) return value;

      if (isRecord(value)) {
        for (const nestedKey of Object.keys(value)) {
          const nestedValue = value[nestedKey];
          if (isEditorJsContent(nestedValue)) return nestedValue;
        }
      }
    }

    return null;
  }

  const unwound = body ?? content ?? null;
  const articleBody = findEditorJsContent(unwound) ?? { blocks: [] };

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
  } catch {
    return null;
  }
}

export async function getArticlePageData(articleCategory: string) {
  if (env.useMockApi) {
    return getMockArticleSecondaryPanelData(articleCategory);
  }

  return getArticleSecondaryPanelData(articleCategory);
}