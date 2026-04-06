import React from "react";
import { classNameHelper } from "@/lib/utils/classNameHelper";

export type CategoryBannerProps = { category: string, className?: string };

export function CategoryBanner({ category, className }: CategoryBannerProps) {
  return (
    <div
      className="border-t border-b border-[#a8a8a8] bg-gray-100 px-5 pt-12 pb-12.5 sm:px-4 sm:pt-10.5 sm:pb-11"
    >
      <div className="mx-auto max-w-300 text-center">
        <h1 className={classNameHelper("font-space text-black text-[30px] font-normal leading-none tracking-[1px] sm:text-[52px] md:text-[68px]", className)}>
          {category}
        </h1>
      </div>
    </div>
  );
}


export type CategoryTitleProps = { title: string, className?: string };

export function CategoryTitle({ title, className }: CategoryTitleProps) {
  return (
    <h1 className={classNameHelper("flex font-space text-black text-[30px] font-normal leading-none tracking-[1px] sm:text-[26px] md:text-[34px] border-b pb-6", className)}>
      {title.toUpperCase()}
    </h1>
  );
}