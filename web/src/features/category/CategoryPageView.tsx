import {
  CategoryBanner,
  CategoryTitle,
} from "@/components/ui/category_banner/CategoryBanner";
import { getCategoryArticles } from "./queries";
import { CategoryArticlesList } from "./CategoryArticlesList";

type InitialCategoryArticle = {
  id?: string;
  article_id?: string;
  title?: string;
  summary?: string;
  preview_text?: string;
  author?: string;
  date?: string;
  created_at?: string;
  caption?: string;
  image_alt?: string;
  imageSrc?: string;
  cover_image_url?: string;
  imageAlt?: string;
  href?: string;
  slug?: string;
};

export function slugToTitle(str: string) {
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export async function CategoryPageView({
  categorySlug,
}: {
  categorySlug: string;
}) {
  const title = slugToTitle(categorySlug);
  const result = await getCategoryArticles(title, 10, 0);
  
  let initialArticles: InitialCategoryArticle[] = [];
  let totalCount = 0;
  
  if (Array.isArray(result)) {
    initialArticles = result;
    totalCount = result.length;
  } else if (result && typeof result === 'object' && 'articles' in result) {
    initialArticles = (result as { articles: InitialCategoryArticle[] }).articles ?? [];
    totalCount = (result as { total?: number }).total ?? initialArticles.length;
  }

  return (
    <div className="mb-12">
      <CategoryBanner category={title} />
      <div className="my-18 flex w-full flex-col items-center">
        <div className="w-full max-w-4xl space-y-6">
          <CategoryTitle title="Latest" />
          <CategoryArticlesList
            categorySlug={title}
            initialArticles={initialArticles}
            totalCount={totalCount}
          />
        </div>
      </div>
    </div>
  );
}