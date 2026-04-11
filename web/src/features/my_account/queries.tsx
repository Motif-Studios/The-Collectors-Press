import { getMyAccountDataApi } from "@/lib/api/account";
import { getMockMyAccountData } from "@/lib/api/mock/account";
import { env } from "@/lib/env";

export async function getMyAccountData() {
  if (env.useMockApi) {
    return getMockMyAccountData();
  }

  return getMyAccountDataApi();
}