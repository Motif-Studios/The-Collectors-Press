"use client";

import { useEffect, useMemo, useState } from "react";
import { ArticleCard } from "@/components/ui/article_card/ArticleCard";

type Article = {
  id: string;
  title: string;
  summary: string;
  author: string;
  date: string;
  caption?: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
};

type RawArticle = {
  id?: string;
  article_id?: string;
  title?: string;
  summary?: string;
  preview_text?: string;
  author?: string;
  date?: string;
  created_at?: string;
  caption?: string;
  image_alt?: string;
  imageSrc?: string;
  cover_image_url?: string;
  imageAlt?: string;
  href?: string;
  slug?: string;
};

type CategoryArticlesListProps = {
  categorySlug: string;
  initialArticles: RawArticle[];
  totalCount: number;
};

const PAGE_SIZE = 10;

function normaliseArticle(raw: RawArticle): Article {
  return {
    id: raw.id ?? raw.article_id ?? String(Math.random()),
    title: raw.title ?? "Untitled",
    summary: raw.summary ?? raw.preview_text ?? "",
    author: raw.author ?? "Unknown",
    date: raw.date ?? raw.created_at ?? "",
    caption: raw.caption ?? raw.image_alt,
    imageSrc: raw.imageSrc ?? raw.cover_image_url ?? "",
    imageAlt: raw.imageAlt ?? raw.image_alt ?? raw.title ?? "",
    href: raw.href ?? (raw.slug ? `/article/${encodeURIComponent(raw.slug)}` : "#"),
  };
}

export function CategoryArticlesList({
  categorySlug,
  initialArticles,
  totalCount,
}: CategoryArticlesListProps) {
  const [articles, setArticles] = useState<Article[]>(initialArticles.map(normaliseArticle));
  const [totalResults, setTotalResults] = useState(totalCount);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(totalResults / PAGE_SIZE)),
    [totalResults],
  );
  const canGoNext = page < totalPages - 1;
  const canGoPrev = page > 0;

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setDebouncedSearch(search);
    }, 250);

    return () => window.clearTimeout(timeout);
  }, [search]);

  useEffect(() => {
    let ignore = false;

    async function loadArticles() {
      setIsPending(true);

      try {
        setError("");
        const offset = page * PAGE_SIZE;
        const params = new URLSearchParams({
          slug: categorySlug,
          search: debouncedSearch,
          sort,
          limit: String(PAGE_SIZE),
          offset: String(offset),
        });
        const res = await fetch(`/api/category-articles?${params}`);
        if (!res.ok) throw new Error("Failed to load articles");
        const { articles: newArticles, total } = await res.json();

        if (ignore) return;

        setArticles((Array.isArray(newArticles) ? newArticles : []).map(normaliseArticle));
        setTotalResults(typeof total === "number" ? total : 0);
      } catch (err) {
        if (ignore) return;
        setError("Failed to load articles");
        console.error(err);
      } finally {
        if (!ignore) {
          setIsPending(false);
        }
      }
    }

    void loadArticles();

    return () => {
      ignore = true;
    };
  }, [categorySlug, debouncedSearch, page, sort]);

  useEffect(() => {
    setPage(0);
  }, [debouncedSearch, sort]);

  async function handlePageChange(newPage: number) {
    if (newPage < 0 || newPage >= totalPages) return;

    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="space-y-6">
      {/* Search and Sort Controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <input
          type="text"
          placeholder="Search articles..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded border border-gray-300 px-3 py-2 text-sm disabled:opacity-50"
        />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          disabled={isPending}
          className="rounded border border-gray-300 px-3 py-2 text-sm disabled:opacity-50"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="az">A-Z</option>
        </select>
      </div>

      {/* Error Message */}
      {error && <div className="rounded bg-red-50 p-3 text-sm text-red-600">{error}</div>}

      {/* Articles Grid */}
      <div className="space-y-4">
        {articles.map((article) => (
          <ArticleCard
            key={article.id}
            title={article.title}
            summary={article.summary}
            author={article.author}
            date={article.date}
            caption={article.caption}
            imageSrc={article.imageSrc}
            imageAlt={article.imageAlt}
            href={article.href}
          />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between gap-4 border-t border-gray-200 pt-4">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={!canGoPrev || isPending}
          className="rounded bg-gray-100 px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
        >
          ← Previous
        </button>
        <div className="text-sm text-gray-600">
          Page {page + 1} of {totalPages}
        </div>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={!canGoNext || isPending}
          className="rounded bg-gray-100 px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next →
        </button>
      </div>
    </div>
  );
}

