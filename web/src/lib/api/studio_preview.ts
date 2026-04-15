import { getMockArticlePreviewData } from "@/lib/api/mock/studio_preview";

export async function getArticlePreviewDataApi(draftId: string) {
  console.log("API CALL: getArticlePreviewData");
  return getMockArticlePreviewData(draftId);
}