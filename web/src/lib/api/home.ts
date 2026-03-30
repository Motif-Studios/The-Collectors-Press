import { getMockHomePageData } from "./mock/home";

export async function getHomePageDataApi() {
  // TEMP: until backend is ready
  console.log("API CALL");
  return getMockHomePageData();
}