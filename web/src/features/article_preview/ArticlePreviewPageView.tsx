import { Wrapper } from "@/components/layout/wrapper/Wrapper";
import { ArticleAuthorSection } from "@/components/ui/article_author_section/ArticleAuthorSection";
import { ArticleBodyRenderer } from "@/features/article/ArticleBodyRenderer";
import { ArticleHero } from "@/features/article/ArticleHero";
import { getArticlePreviewData } from "./queries";

type ArticlePreviewPageViewProps = {
  draftId: string;
};

export async function ArticlePreviewPageView({
  draftId,
}: ArticlePreviewPageViewProps) {
  const article = await getArticlePreviewData(draftId);

  return (
    <div>
      <div className="sticky top-4 z-50 mx-auto mb-4 max-w-[800px] rounded-md border border-amber-300 bg-amber-50 px-4 py-3 text-center text-sm font-semibold text-amber-900 shadow-md">
        Preview mode — this article is not published
      </div>

      <Wrapper>
        <ArticleHero article={article} />

        <div className="mb-24 px-15">
          <ArticleBodyRenderer content={article.body} />
        </div>

        <ArticleAuthorSection
          authorName={article.author.name}
          authorDescription={article.author.description}
          authorPhoto={article.author.avatarSrc ? article.author.avatarSrc : ""}
          moreTopics={article.author.moreTopics || []}
        />
      </Wrapper>
    </div>
  );
}
