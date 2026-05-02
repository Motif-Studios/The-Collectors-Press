import Link from "next/link";
import { StudioRouteFeedback } from "@/features/article_create/StudioRouteFeedback";

type StudioCreateErrorPageProps = {
  searchParams?: {
    feedback?: string;
  };
};

export default function StudioCreateErrorPage({ searchParams }: StudioCreateErrorPageProps) {
  const feedback = searchParams?.feedback === "create_failed"
    ? { type: "error" as const, message: "We couldn't create your article. Please try again." }
    : { type: "error" as const, message: "We couldn't create your article." };

  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 py-6 md:px-6 md:py-8">
      <StudioRouteFeedback feedback={feedback} />

      <div className="mx-auto flex w-full max-w-[520px] flex-col items-center">
        <div className="w-full rounded-[28px] border border-[#e3e3e3] bg-white px-6 py-8 text-center shadow-[0_18px_50px_rgba(0,0,0,0.06)] sm:px-10 sm:py-12">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-[#6c7680]">
            Studio error
          </p>

          <h1 className="mb-3 text-2xl font-bold tracking-tight text-[#111] sm:text-[28px]">
            We couldn’t create your article.
          </h1>

          <p className="mb-8 text-sm leading-6 text-[#6c7680] sm:text-[15px]">
            This usually means your session expired or the server could not create a draft right now. Please try again from the studio dashboard.
          </p>

          <Link
            href="/studio"
            className="inline-flex h-12 items-center justify-center bg-[#3fa0cf] px-6 text-[15px] font-bold text-white transition hover:bg-[#3495c3]"
          >
            Back to studio
          </Link>
        </div>
      </div>
    </div>
  );
}