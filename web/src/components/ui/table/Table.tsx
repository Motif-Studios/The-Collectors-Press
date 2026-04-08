import React from "react";

export type TableProps = {
  children: React.ReactNode;
  className?: string;
  tableClassName?: string;
  minWidthClassName?: string;
};

function classNameHelper(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

export function Table({
  children,
  className,
  tableClassName,
  minWidthClassName = "min-w-[920px]",
}: TableProps) {
  return (
    <div
      className={classNameHelper(
        "overflow-hidden border border-neutral-300 bg-[#fdfdfd]",
        className
      )}
    >
      <div className="w-full overflow-x-auto">
        <table
          className={classNameHelper(
            "w-full border-collapse",
            minWidthClassName,
            tableClassName
          )}
        >
          {children}
        </table>
      </div>
    </div>
  );
}