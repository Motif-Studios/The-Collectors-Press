import React from "react";

export type ArticleStatsCardProps = {
  label: string;
  value: number | string;
  className?: string;
};

function classNameHelper(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

export function ArticleStatsCard({
  label,
  value,
  className,
}: ArticleStatsCardProps) {
  return (
    <div
      className={classNameHelper(
        "flex flex-col gap-2 border border-neutral-300 bg-[#f8f8f8] p-4",
        className
      )}
    >
      <span className="text-xs uppercase tracking-[0.06em] text-neutral-500">
        {label}
      </span>

      <strong className="font-serif text-4xl font-medium leading-none text-black">
        {value}
      </strong>
    </div>
  );
}