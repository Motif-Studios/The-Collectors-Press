import React from "react";
import { classNameHelper } from "@/lib/utils/classNameHelper";

export type CategoryBannerProps = {
  children: React.ReactNode;
  className?: string;
};

export function Wrapper({ children, className }: CategoryBannerProps) {
  return (
    <div className={classNameHelper("mx-auto max-w-245 p-5 max-[600px]:p-4", className)}>
      {children}
    </div>
  );
}
