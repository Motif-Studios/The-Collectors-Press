import { Article } from "./types";
import { Wrapper } from "@/components/layout/wrapper/Wrapper";
import { ArticleAuthorSection } from "@/components/ui/article_author_section/ArticleAuthorSection";
import { SecondaryNewsPanel } from "@/components/ui/news_panels/secondary";
import { getArticlePageData } from "./queries";

export async function ArticlePageView({ article }: { article: Article }) {
  const data = await getArticlePageData();
  const { secondaryPanel } = data;
  return (
    <Wrapper>
      <div>{article.title}</div>
      <div>article renderer goes here (TBD)</div>
      <ArticleAuthorSection
        authorName={article.author.name}
        authorDescription={article.author.description}
        authorPhoto={article.author.avatarSrc ? article.author.avatarSrc : ""}
        moreTopics={article.author.moreTopics || []}
      />
      <SecondaryNewsPanel
        className="mt-20"
        topStories={secondaryPanel.topStories}
        stories={secondaryPanel.stories}
        miniCards={secondaryPanel.miniCards}
      />
    </Wrapper>
  );
}
