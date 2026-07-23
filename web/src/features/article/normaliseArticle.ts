import type { Article } from "./types";

type ApiArticle = {
  article_id?: string;
  slug?: string;
  title?: string;
  description?: string;
  preview_text?: string;
  status?: "draft" | "submitted" | "rejected" | "published" | "archived";
  created_at?: string;
  updated_at?: string;
  cover_image_url?: string;
  image_alt?: string;
  content?: unknown;
  body?: unknown;
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

function findEditorJsContent(value: unknown): Article["body"] | null {
  if (isEditorJsContent(value)) return value;
  if (!isRecord(value)) return null;

  for (const nestedValue of Object.values(value)) {
    if (isEditorJsContent(nestedValue)) {
      return nestedValue;
    }

    if (isRecord(nestedValue)) {
      const deepMatch = findEditorJsContent(nestedValue);
      if (deepMatch) {
        return deepMatch;
      }
    }
  }

  return null;
}

export function normaliseArticle(raw: ApiArticle | null | undefined): Article {
  const content = parseMaybeJson(raw?.content);
  const body = parseMaybeJson(raw?.body);
  const articleBody = findEditorJsContent(body ?? content ?? null) ?? { blocks: [] };

  return {
    id: raw?.article_id ?? "",
    slug: raw?.slug ?? "",
    title: raw?.title ?? "",
    subtitle: raw?.description,
    excerpt: raw?.preview_text,
    status: raw?.status ?? "draft",
    publishedAt: raw?.created_at,
    updatedAt: raw?.updated_at,
    author: raw?.author ?? {
      id: "unknown-author",
      name: "Unknown author",
      description: "",
      avatarSrc: "",
      moreTopics: [],
    },
    coverImage: raw?.cover_image_url
      ? {
          src: raw.cover_image_url,
          alt: raw.image_alt ?? raw.title ?? "Article cover image",
        }
      : undefined,
    body: articleBody,
  };
}