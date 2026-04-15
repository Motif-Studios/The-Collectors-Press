import { getArticlePreviewDataApi } from "@/lib/api/studio_preview";
import { getMockArticlePreviewData } from "@/lib/api/mock/studio_preview";
import { env } from "@/lib/env";

export async function getArticlePreviewData(draftId: string) {
  if (env.useMockApi) {
    return getMockArticlePreviewData(draftId);
  }

  return getArticlePreviewDataApi(draftId);
}