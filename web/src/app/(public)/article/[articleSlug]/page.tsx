import { ArticlePageView } from "@/features/article/ArticlePageView";
import { getArticleBySlug } from "@/features/article/queries";
import Link from "next/link";

export default async function ArticlePage({ params }: { params: Promise<{ articleSlug: string }>}) {
  const { articleSlug } = await params;
  const article = await getArticleBySlug(articleSlug);

  if (!article) {
    return (
      <div className="min-h-screen bg-[#f5f5f5] px-4 py-10 sm:py-14">
        <div className="mx-auto flex w-full max-w-[720px] flex-col items-center">
          <div className="w-full rounded-[28px] border border-[#e3e3e3] bg-white px-6 py-8 text-center shadow-[0_18px_50px_rgba(0,0,0,0.06)] sm:px-10 sm:py-12">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-[#6c7680]">
              Article unavailable
            </p>

            <h1 className="mb-3 text-2xl font-bold tracking-tight text-[#111] sm:text-[28px]">
              We couldn’t load this article.
            </h1>

            <p className="mb-8 text-sm leading-6 text-[#6c7680] sm:text-[15px]">
              The article may have been removed, the link may be outdated, or the content is temporarily unavailable.
            </p>

            <Link
              href="/"
              className="inline-flex h-12 items-center justify-center bg-[#3fa0cf] px-6 text-[15px] font-bold text-white transition hover:bg-[#3495c3]"
            >
              Back to home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <ArticlePageView article={article} />;
}