import type { ReactNode } from "react";
import { classNameHelper } from "@/lib/utils/classNameHelper";

type ArticleMetaCardProps = {
  label: string;
  children: ReactNode;
  className?: string;
};

export function ArticleMetaCard({
  label,
  children,
  className,
}: ArticleMetaCardProps) {
  return (
    <div
      className={classNameHelper(
        "border border-neutral-200 bg-white p-4",
        className,
      )}
    >
      <p className="text-xs uppercase tracking-widest text-neutral-500">
        {label}
      </p>

      <div className="mt-1 text-sm text-black">{children}</div>
    </div>
  );
}
