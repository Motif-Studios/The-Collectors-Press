import { getMockNotFoundPageData } from "./mock/not_found";

export async function getNotFoundPageDataApi() {
  // TEMP: until backend is ready
  console.log("API CALL");
  return getMockNotFoundPageData();
}