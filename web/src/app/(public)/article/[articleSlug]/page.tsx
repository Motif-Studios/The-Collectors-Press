import { ArticlePageView } from "@/features/article/ArticlePageView";
import { getArticleBySlug } from "@/features/article/queries";

export default async function ArticlePage({ params }: { params: Promise<{ articleSlug: string }>}) {
  const { articleSlug } = await params;
  const article = await getArticleBySlug(articleSlug);

  return <ArticlePageView article={article} />;
}