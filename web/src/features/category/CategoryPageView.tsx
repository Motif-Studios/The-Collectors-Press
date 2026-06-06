import {
  CategoryBanner,
  CategoryTitle,
} from "@/components/ui/category_banner/CategoryBanner";
import { getCategoryArticles } from "./queries";
import { CategoryArticlesList } from "./CategoryArticlesList";

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
  console.log("CategoryPageView rendered with slug:", categorySlug);
  const initialArticles = await getCategoryArticles(categorySlug, 10, 0);
  console.log("Fetched initial articles for category:", initialArticles);

  return (
    <div className="mb-12">
      <CategoryBanner category={title} />
      <div className="my-18 flex w-full flex-col items-center">
        <div className="w-full max-w-4xl space-y-6">
          <CategoryTitle title="Latest" />
          <CategoryArticlesList
            categorySlug={categorySlug}
            initialArticles={initialArticles}
          />
        </div>
      </div>
    </div>
  );
}