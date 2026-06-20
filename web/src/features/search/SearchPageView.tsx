import { getSearchArticles } from "./queries";
import { ArticleCard } from "@/components/ui/article_card/ArticleCard";
import Link from "next/link";

type SearchPageViewProps = {
  searchQuery: string;
};

export async function SearchPageView({
  searchQuery,
}: SearchPageViewProps) {
  const trimmedQuery = searchQuery.trim();

  if (!trimmedQuery) {
    return (
      <div className="w-full max-w-4xl">
        <p className="text-sm text-neutral-600 mt-3">
          Search for articles or categories above.
        </p>
      </div>
    );
  }

  const data = await getSearchArticles(trimmedQuery);
  const hasArticles = data.articles.length > 0;
  const hasCategories = data.categories.length > 0;

  if (!hasArticles && !hasCategories) {
    return (
      <div className="w-full max-w-4xl">
        <p className="text-sm text-neutral-600 mt-3">
          No results found for <span className="font-medium text-black">“{trimmedQuery}”</span>.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      {hasCategories ? (
        <section className="mb-8">
          <h2 className="mb-3 text-lg font-semibold text-black">Categories</h2>
          <div className="flex flex-wrap gap-3">
            {data.categories.map((category) => (
              <Link
                key={category.id}
                href={category.href}
                className="rounded-full border border-[#d7d7d7] bg-white px-4 py-2 text-sm font-medium text-black transition hover:border-black hover:bg-black hover:text-white"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {hasArticles ? (
        <section>
          <h2 className="mb-3 text-lg font-semibold text-black">Articles</h2>
          <div className="space-y-4">
            {data.articles.map((article) => (
              <ArticleCard
                key={article.id}
                title={article.title}
                summary={article.summary}
                author={article.author}
                date={article.date}
                caption={article.caption}
                imageSrc={article.imageSrc}
                imageAlt={article.imageAlt}
                href={article.href}
              />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}