import { StudioCreateArticlePageView } from "@/features/article_create/StudioCreateArticlePageView";

export default async function StudioCreateArticleByIdPage({
  params,
}: {
  params: Promise<{ article_id: string }>;
}) {
  const { article_id } = await params;
  console.log("Article ID in page component:", article_id);

  return <StudioCreateArticlePageView articleId={article_id} />;
}
