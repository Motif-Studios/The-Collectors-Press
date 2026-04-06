import React from "react";
import { classNameHelper } from "@/lib/utils/classNameHelper";

export type EditorCardProps = {
  children: React.ReactNode;
  className?: string;
};

export function EditorCard({ children, className }: EditorCardProps) {
  return (
    <div
      className={classNameHelper(
        "border border-neutral-200 bg-white p-4 md:p-5",
        className
      )}
    >
      {children}
    </div>
  );
}