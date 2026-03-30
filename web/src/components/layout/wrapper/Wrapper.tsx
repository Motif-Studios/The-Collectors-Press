import React from "react";

export type CategoryBannerProps = {
  children: React.ReactNode;
  className?: string;
};

function classNameHelper(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

export function Wrapper({ children, className }: CategoryBannerProps) {
  return (
    <div className={classNameHelper("mx-auto max-w-245 p-5 max-[600px]:p-4", className)}>
      {children}
    </div>
  );
}
