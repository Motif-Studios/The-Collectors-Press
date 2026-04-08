import { classNameHelper } from "@/lib/utils/classNameHelper";

type ArticleStatus = "draft" | "published";

type ArticleStatusBadgeProps = {
  status: ArticleStatus;
  className?: string;
};

const statusStyles: Record<ArticleStatus, string> = {
  draft: "bg-neutral-200 text-black border border-neutral-100",
  published: "bg-green-50 text-green-800 border border-green-100",
};

const statusLabels: Record<ArticleStatus, string> = {
  draft: "Draft",
  published: "Published",
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