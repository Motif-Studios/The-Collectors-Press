import { getMockArticleBySlug, getMockArticleSecondaryPanelData } from "./mock/article";

export async function getArticlePageDataApi(articleSlug: string) {
  // TEMP: until backend is ready
  console.log("API CALL");
  return getMockArticleBySlug(articleSlug);
}

export async function getArticleSecondaryPanelData(articleCategory: string) {
  // TEMP: until backend is ready
  console.log("API CALL");
  return getMockArticleSecondaryPanelData(articleCategory);
}