import { CategoryPageView } from "@/features/category/CategoryPageView";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return <CategoryPageView categorySlug={slug} />;
}
