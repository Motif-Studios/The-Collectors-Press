import { Suspense } from "react";
import { HomePageView } from "@/features/home";
import { HomePageSkeleton } from "@/features/home/HomePageSkeleton";

export default function Page() {
  // Stream the header/footer immediately and fill in the stories when they arrive
  return (
    <Suspense fallback={<HomePageSkeleton />}>
      <HomePageView />
    </Suspense>
  );
}
