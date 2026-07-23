import { StudioDashboardPageView } from "@/features/dashboard/StudioDashboardPageView";

type Props = {
  searchParams: Promise<{ search?: string; status?: string; sort?: string; page?: string }>;
};

export default async function StudioHomePage({ searchParams }: Props) {
  const params = await searchParams;
  return <StudioDashboardPageView searchParam={params} />;
}
