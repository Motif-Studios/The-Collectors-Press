import { Article } from "./types";
import { Wrapper } from "@/components/layout/wrapper/Wrapper";
import { ArticleAuthorSection } from "@/components/ui/article_author_section/ArticleAuthorSection";
import { SecondaryNewsPanel } from "@/components/ui/news_panels/secondary";
import { ArticleBodyRenderer } from "./ArticleBodyRenderer";
import { ArticleHero } from "./ArticleHero";
import { getCurrentUser } from "@/features/auth/queries/getCurrentUser";
import { getIsSubscriber } from "@/features/auth/queries/getIsSubscriber";
import { getHomePageDataNormalised } from "@/lib/api/home";
import type { SecondaryTopStoryItem } from "@/components/ui/news_panels/secondary";
import "./paywall.css";

function PaywallSection() {
  return (
    <section className="article-preview-paywall">
      <section className="paywall-cta">
        <p className="paywall-kicker">Keep reading <em>the Collectors Press.</em></p>

        <h2 className="paywall-title">
          Get essential journalism for historic times.<br />
          For less than <span className="paywall-old-price">$2.77</span> $1.73 a
          week.
        </h2>

        <div className="paywall-options">
          <div className="paywall-option">
            <p className="paywall-option-text">
              Subscribe for one year of access<br />
              and a role in supporting<br />
              independent journalism.
            </p>
            <a href="/subscribe" className="paywall-btn">Subscribe</a>
          </div>

          <div className="paywall-divider">
            <span>or</span>
          </div>

          <div className="paywall-option">
            <p className="paywall-option-text">
              Try 30 days free and see how<br />
              <em>The Collectors Press</em> fits into your<br />
              daily routine.
            </p>
            <a href="/subscribe" className="paywall-btn">Start free trial</a>
          </div>
        </div>

        <p className="paywall-signin">
          Already have an account? <a href="/login">Sign in</a>
        </p>
      </section>
    </section>
  );
}

export async function ArticlePageView({ article }: { article: Article }) {
  const user = await getCurrentUser();
  let hasSubscription = false;

  if (user) {
    const subscriptionData = await getIsSubscriber(user.id);
    hasSubscription = subscriptionData.is_subscriber === true;
  }

  const { secondaryPanel } = await getHomePageDataNormalised();
  const relatedLinks = secondaryPanel.miniCards.map((card) => ({
    title: card.title,
    href: card.href,
    imageSrc: card.imageSrc,
    imageAlt: card.imageAlt,
  }));

  return (
    <div>
      <Wrapper>
        <ArticleHero article={article} userId={user?.id} />
        <div className="px-15 mb-24">
          {user && hasSubscription ? (
            <ArticleBodyRenderer content={article.body} />
          ) : (
            <PaywallSection />
          )}
        </div>
        {user && hasSubscription && (
          <ArticleAuthorSection
            authorName={article.author.name}
            authorDescription={article.author.description}
            authorPhoto={article.author.avatarSrc ? article.author.avatarSrc : ""}
            moreTopics={relatedLinks.length ? relatedLinks : article.author.moreTopics || []}
          />
        )}
      </Wrapper>
      {/* <SecondaryNewsPanel
        className="mt-20"
        topStories={secondaryPanel.topStories as [SecondaryTopStoryItem, SecondaryTopStoryItem]}
        stories={secondaryPanel.stories}
        miniCards={secondaryPanel.miniCards}
      /> */}
    </div>
  );
}
