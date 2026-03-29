import React from "react";

export type CategoryBannerProps = { category: string, className: string };

function classNameHelper(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

export function CategoryBanner({ category, className }: CategoryBannerProps) {
  return (
    <div
      className="border-t border-b border-[#a8a8a8] px-5 pt-12 pb-12.5 sm:px-4 sm:pt-10.5 sm:pb-11"
    >
      <div className="mx-auto max-w-300 text-center">
        <h1 className={classNameHelper("font-serif text-black text-[30px] font-normal leading-none tracking-[1px] sm:text-[52px] md:text-[68px]", className)}>
          {category}
        </h1>
      </div>
    </div>
  );
}