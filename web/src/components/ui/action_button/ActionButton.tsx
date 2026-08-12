import React from "react";

export type ActionButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: "default" | "primary";
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  loading?: boolean;
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
  disabled = false,
  loading = false,
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
      <a href={href} className={classes} aria-disabled={disabled}>
        {loading ? (
          <span className="inline-flex items-center gap-2">
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" strokeOpacity="0.25" />
              <path d="M22 12a10 10 0 00-10-10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            </svg>
            <span>Loading...</span>
          </span>
        ) : (
          children
        )}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes} disabled={disabled} aria-busy={loading}>
      {loading ? (
        <span className="inline-flex items-center gap-2">
          <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" strokeOpacity="0.25" />
            <path d="M22 12a10 10 0 00-10-10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
          </svg>
          <span>Processing...</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
}
