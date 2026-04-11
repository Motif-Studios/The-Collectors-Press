import { getMockMyAccountData } from "./mock/account";

export async function getMyAccountDataApi() {
  // TEMP: until backend is ready
  console.log("API CALL");
  return getMockMyAccountData();
}