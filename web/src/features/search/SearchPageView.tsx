import { getSearchArticles } from "./queries";
import { ArticleCard } from "@/components/ui/article_card/ArticleCard";

type SearchPageViewProps = {
  searchQuery: string;
};

export async function SearchPageView({
  searchQuery,
}: SearchPageViewProps) {
  const trimmedQuery = searchQuery.trim();

  if (!trimmedQuery) {
    return null;      
  }

  const data = await getSearchArticles(trimmedQuery);

  if (data.length === 0) {
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
      {data.map((article) => (
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
  );
}