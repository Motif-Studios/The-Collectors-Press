import { StudioPageHeader } from "@/components/ui/studio_page_header/StudioPageHeader";
import { ActionButton } from "@/components/ui/action_button/ActionButton";
import { getStudioCreateArticleById } from "./queries";
import { StudioCreateArticleForm } from "./StudioCreateArticleForm";
import { normaliseArticleData } from "../dashboard/queries/normaliseArticleData";
import { StudioRouteFeedback } from "./StudioRouteFeedback";

type StudioFeedback = {
  type: "success" | "error";
  message: string;
};

type StudioCreateArticlePageViewProps = {
  articleId: string;
  feedback?: StudioFeedback | null;
};

export async function StudioCreateArticlePageView({
  articleId,
  feedback = null,
}: StudioCreateArticlePageViewProps) {
  const data = await getStudioCreateArticleById(articleId);
  const normalisedData = await normaliseArticleData(data);

  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 py-6 md:px-6 md:py-8">
      <div className="flex flex-col gap-6">
        <StudioPageHeader
          title="Create article"
          description="Draft, preview and prepare your story for publishing."
          actions={
            <>
              <ActionButton>Save draft</ActionButton>
              <ActionButton>Preview</ActionButton>
              <ActionButton variant="primary">Publish</ActionButton>
            </>
          }
        />

        <StudioRouteFeedback feedback={feedback} />

        <StudioCreateArticleForm
          authorName={normalisedData.authorName}
          categories={normalisedData.categories}
          article={normalisedData.article}
        />
      </div>
    </div>
  );
}