import { redirect } from "next/navigation";
import { getCurrentUser } from "@/features/auth/queries/getCurrentUser";
import { AdminDashboardPageView } from "@/features/admin/AdminDashboardPageView";

type Props = {
  searchParams: Promise<{
    queuedSearch?: string;
    queuedStatus?: string;
    queuedPage?: string;
    allSearch?: string;
    allStatus?: string;
    allPage?: string;
  }>;
};

export default async function StudioAdminPage({ searchParams }: Props) {
  const user = await getCurrentUser();
  const params = await searchParams;

  if (!user || user.userType !== "admin") {
    redirect("/studio");
  }

  return <AdminDashboardPageView searchParams={params} />;
}
