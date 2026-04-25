import { StudioCreateArticlePageView } from "@/features/article_create/StudioCreateArticlePageView";

export default async function StudioCreateArticleByIdAndSlugPage({
  params,
}: {
  params: Promise<{ article_id: string; article_slug: string }>;
}) {
  const { article_id } = await params;

  return <StudioCreateArticlePageView articleId={article_id} />;
}
