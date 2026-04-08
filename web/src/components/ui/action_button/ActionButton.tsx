import React from "react";

export type ActionButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: "default" | "primary";
  className?: string;
  type?: "button" | "submit" | "reset";
};

function classNameHelper(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

export function ActionButton({
  children,
  onClick,
  href,
  variant = "default",
  className,
  type = "button",
}: ActionButtonProps) {
  const baseClasses =
    "inline-flex min-h-11 items-center justify-center border px-4 py-2 text-sm font-semibold transition hover:opacity-85";

  const variantClasses =
    variant === "primary"
      ? "border-black bg-black text-white"
      : "border-neutral-300 bg-transparent text-black";

  const classes = classNameHelper(baseClasses, variantClasses, className);

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
