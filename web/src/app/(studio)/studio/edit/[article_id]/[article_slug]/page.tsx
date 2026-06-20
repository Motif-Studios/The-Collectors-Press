import { StudioCreateArticlePageView } from "@/features/article_create/StudioCreateArticlePageView";

export default async function StudioEditArticlePage({
  params,
  searchParams,
}: {
  params: Promise<{ article_id: string; article_slug: string }>;
  searchParams?: Promise<{ feedback?: string }>;
}) {
  const { article_id } = await params;
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const feedback = resolvedSearchParams?.feedback === "created"
    ? { type: "success" as const, message: "Article created successfully." }
    : resolvedSearchParams?.feedback === "create_failed"
      ? { type: "error" as const, message: "We couldn't create your article. Please try again." }
      : null;

  return <StudioCreateArticlePageView articleId={article_id} feedback={feedback} />;
}
