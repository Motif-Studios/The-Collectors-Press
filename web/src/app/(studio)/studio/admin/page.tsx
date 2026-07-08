import { redirect } from "next/navigation";
import { getCurrentUser } from "@/features/auth/queries/getCurrentUser";
import { AdminDashboardPageView } from "@/features/admin/AdminDashboardPageView";

export default async function StudioAdminPage() {
  const user = await getCurrentUser();

  if (!user || user.userType !== "admin") {
    redirect("/studio");
  }

  return <AdminDashboardPageView />;
}
