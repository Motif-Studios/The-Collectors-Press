import { getStudioCreateArticleData } from "./queries";
import { StudioCreateArticleEditor } from "./StudioCreateArticleEditor";

export async function StudioCreateArticlePageView() {
  const data = await getStudioCreateArticleData();

  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 py-6 md:px-6 md:py-8">
      <StudioCreateArticleEditor
        authorName={data.authorName}
        categories={data.categories}
        initialArticle={data.article}
      />
    </div>
  );
}