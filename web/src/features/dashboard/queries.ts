import { getStudioDashboardDataApi } from "@/lib/api/studio_dashboard";
import { getMockStudioDashboardData } from "@/lib/api/mock/studio_dashboard";
import { env } from "@/lib/env";

export async function getStudioDashboardData() {
  if (env.useMockApi) {
    return getMockStudioDashboardData();
  }

  return getStudioDashboardDataApi();
}