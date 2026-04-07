"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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

type CategoryArticlesListProps = {
  categorySlug: string;
  initialArticles: Article[];
};

const BATCH_SIZE = 10;

export function CategoryArticlesList({
  categorySlug,
  initialArticles,
}: CategoryArticlesListProps) {
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [offset, setOffset] = useState(initialArticles.length);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialArticles.length === BATCH_SIZE);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const loadMoreArticles = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    try {
      const response = await fetch(
        `http://localhost:5001/articles/category/${categorySlug}/${BATCH_SIZE}/${offset}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch more articles");
      }

      const newArticles: Article[] = await response.json();

      setArticles((prev) => [...prev, ...newArticles]);
      setOffset((prev) => prev + newArticles.length);

      if (newArticles.length < BATCH_SIZE) {
        setHasMore(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [categorySlug, offset, loading, hasMore]);

  useEffect(() => {
    const target = loadMoreRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        if (firstEntry.isIntersecting) {
          loadMoreArticles();
        }
      },
      {
        root: null,
        rootMargin: "200px",
        threshold: 0,
      }
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [loadMoreArticles]);

  return (
    <>
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

      {loading && (
        <div className="py-4 text-center text-sm text-gray-500">Loading...</div>
      )}

      {!loading && hasMore && <div ref={loadMoreRef} className="h-10" />}
    </>
  );
}