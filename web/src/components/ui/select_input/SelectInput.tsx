import React from "react";

export type SelectInputProps = {
  children: React.ReactNode;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
  name?: string;
  id?: string;
  disabled?: boolean;
  defaultValue?: string;
};

function classNameHelper(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

export function SelectInput({
  children,
  value,
  onChange,
  className,
  name,
  id,
  disabled = false,
  defaultValue,
}: SelectInputProps) {
  return (
    <div className="relative inline-flex min-w-[160px]">
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        defaultValue={defaultValue}
        className={classNameHelper(
          "min-h-12 w-full appearance-none border border-neutral-300 bg-[#fafafa] px-4 pr-10 text-[15px] text-black outline-none transition",
          "disabled:cursor-not-allowed disabled:opacity-60",
          className
        )}
      >
        {children}
      </select>

      <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-sm text-black">
        ▼
      </span>
    </div>
  );
}