import Link from "next/link";

interface ErrorFallbackProps {
  title?: string;
  description?: string;
  code?: string;
  actionLabel?: string;
  actionHref?: string;
}

export function ErrorFallback({
  title = "Something went wrong",
  description = "We encountered an unexpected error. Please try again or contact support if the problem persists.",
  code = "ERROR",
  actionLabel = "Go to homepage",
  actionHref = "/",
}: ErrorFallbackProps) {
  return (
    <div className="min-h-screen bg-[#f5f5f5] px-4 py-10 sm:py-14">
      <div className="mx-auto flex w-full max-w-[520px] flex-col items-center">
        <div className="w-full rounded-[28px] border border-[#e3e3e3] bg-white px-6 py-8 text-center shadow-[0_18px_50px_rgba(0,0,0,0.06)] sm:px-10 sm:py-12">
          <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#ffe5e5]">
            <svg
              className="h-8 w-8 text-[#ff4d4f]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-[#6c7680]">
            Error {code}
          </p>

          <h1 className="mb-3 text-2xl font-bold tracking-tight text-[#111] sm:text-[28px]">
            {title}
          </h1>

          <p className="mb-8 text-sm leading-6 text-[#6c7680] sm:text-[15px]">
            {description}
          </p>

          <Link
            href={actionHref}
            className="mt-6 inline-flex h-12 items-center justify-center bg-[#3fa0cf] px-6 text-[15px] font-bold text-white transition hover:bg-[#3495c3]"
          >
            {actionLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}