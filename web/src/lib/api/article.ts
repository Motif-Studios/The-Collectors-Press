import { getMockArticleBySlug, getMockArticleSecondaryPanelData } from "./mock/article";

export async function getArticlePageDataApi(articleSlug: string) {
    const data = await fetch(`http://localhost:5001/article/${encodeURIComponent(articleSlug)}`)

    const response = await data.json();

    if (response.error) {
        console.error("Error fetching article page data:", response.error);
        return { error: "Failed to fetch article data" };
    }

    return data;
}

export async function getArticleSecondaryPanelData(articleCategory: string) {
  // TEMP: until backend is ready
  console.log("API CALL");
  return getMockArticleSecondaryPanelData(articleCategory);
}