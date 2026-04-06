import { getMockStudioDashboardData } from "@/lib/api/mock/studio_dashboard";

export async function getStudioDashboardDataApi() {
  // TEMP: until backend is ready
  console.log("API CALL");
  return getMockStudioDashboardData();
}