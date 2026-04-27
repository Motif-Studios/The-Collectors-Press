import { ArticlePreviewPageView } from "@/features/article_preview/ArticlePreviewPageView";

export default async function StudioArticlePreviewPage({
  params,
}: {
  params: Promise<{ previewId: string }>;
}) {
  const { previewId } = await params;

  return <ArticlePreviewPageView draftId={previewId} />;
}