import { getArticlePreviewDataApi } from "@/lib/api/studio_preview";
import { getMockArticlePreviewData } from "@/lib/api/mock/studio_preview";
import { env } from "@/lib/env";
import { normaliseArticle } from "@/features/article/normaliseArticle";

export async function getArticlePreviewData(draftId: string) {
  if (env.useMockApi) {
    return getMockArticlePreviewData(draftId);
  }

  const data = await getArticlePreviewDataApi(draftId);
  return normaliseArticle(data as Record<string, unknown> | null | undefined);
}