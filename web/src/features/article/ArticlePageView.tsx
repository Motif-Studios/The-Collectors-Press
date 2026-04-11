import { Article } from "./types";
import { Wrapper } from "@/components/layout/wrapper/Wrapper";
import { ArticleAuthorSection } from "@/components/ui/article_author_section/ArticleAuthorSection";
import { SecondaryNewsPanel } from "@/components/ui/news_panels/secondary";
import { getArticlePageData } from "./queries";
import { ArticleBodyRenderer } from "./ArticleBodyRenderer";
import { ArticleHero } from "./ArticleHero";

export async function ArticlePageView({ article }: { article: Article }) {
  const data = await getArticlePageData(article.category ?? "");
  const { secondaryPanel } = data;
  return (
    <div>
      <Wrapper>
        <ArticleHero article={article} />
        <div className="px-15 mb-24">
          <ArticleBodyRenderer content={article.body} />
        </div>
        <ArticleAuthorSection
          authorName={article.author.name}
          authorDescription={article.author.description}
          authorPhoto={article.author.avatarSrc ? article.author.avatarSrc : ""}
          moreTopics={article.author.moreTopics || []}
        />
      </Wrapper>
      <SecondaryNewsPanel
        className="mt-20"
        topStories={secondaryPanel.topStories}
        stories={secondaryPanel.stories}
        miniCards={secondaryPanel.miniCards}
      />
    </div>
  );
}
