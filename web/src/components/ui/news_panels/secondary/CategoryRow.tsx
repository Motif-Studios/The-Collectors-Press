import React from "react";
import { classNameHelper } from "@/lib/utils/classNameHelper";

export type CategoryRowProps = {
  categories?: string[];
  className?: string;
};

export function CategoryRow({
  categories = [],
  className,
}: CategoryRowProps) {
  if (!categories.length) {
    return null;
  }

  return (
    <div
      className={classNameHelper(
        "mb-2.5 flex flex-wrap items-center gap-2 text-[12px] font-bold leading-none text-[#6b90d6]",
        className
      )}
    >
      {categories.map((category, index) => (
        <span key={`${category}-${index}`}>{category}</span>
      ))}
    </div>
  );
}