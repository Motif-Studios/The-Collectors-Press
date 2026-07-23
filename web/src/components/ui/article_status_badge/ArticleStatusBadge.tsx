import { classNameHelper } from "@/lib/utils/classNameHelper";

type ArticleStatus = "draft" | "submitted" | "rejected" | "published" | "archived";

type ArticleStatusBadgeProps = {
  status: ArticleStatus;
  className?: string;
};

const statusStyles: Record<ArticleStatus, string> = {
  draft: "bg-neutral-200 text-black border border-neutral-100",
  submitted: "bg-amber-50 text-amber-900 border border-amber-100",
  rejected: "bg-rose-50 text-rose-900 border border-rose-100",
  published: "bg-green-50 text-green-800 border border-green-100",
  archived: "bg-slate-100 text-slate-700 border border-slate-200",
};

const statusLabels: Record<ArticleStatus, string> = {
  draft: "Draft",
  submitted: "Submitted",
  rejected: "Rejected",
  published: "Published",
  archived: "Archived",
};

export function ArticleStatusBadge({ status, className }: ArticleStatusBadgeProps) {
  return (
    <span
      className={classNameHelper(
        "inline-flex items-center justify-center px-1.5 py-1.5 text-sm leading-none font-medium whitespace-nowrap",
        statusStyles[status],
        className
      )}
    >
      {statusLabels[status]}
    </span>
  );
}