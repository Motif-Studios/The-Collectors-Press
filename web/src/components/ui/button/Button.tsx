import React from "react";
import clsx from "clsx";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  disabled,
  onClick,
  className,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        "rounded-sm font-medium transition",
        "flex items-center justify-center",

        // sizes
        {
          "px-3 py-1.5 text-sm": size === "sm",
          "px-4 py-2 text-base": size === "md",
          "px-5 py-3 text-lg": size === "lg",
        },

        // variants
        {
          "bg-black text-white hover:opacity-80":
            variant === "primary",
          "bg-red-500 text-black hover:bg-gray-200":
            variant === "secondary",
          "border border-gray-300 text-black hover:bg-gray-50":
            variant === "outline",
        },

        // disabled
        disabled && "opacity-50 cursor-not-allowed",

        className
      )}
    >
      {children}
    </button>
  );
}