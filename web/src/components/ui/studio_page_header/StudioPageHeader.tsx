import React from "react";

export type StudioPageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: React.ReactNode;
  className?: string;
};

function classNameHelper(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

export function StudioPageHeader({
  eyebrow = "Author workspace",
  title,
  description,
  actions,
  className,
}: StudioPageHeaderProps) {
  return (
    <div
      className={classNameHelper(
        "flex flex-col justify-between gap-5 border-b border-neutral-200 pb-6 lg:flex-row lg:items-start",
        className,
      )}
    >
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-600">
          {eyebrow}
        </p>

        <h1 className="mt-2 font-serif text-4xl leading-none text-black md:text-5xl">
          {title}
        </h1>

        {description ? (
          <p className="mt-3 max-w-[640px] text-base text-neutral-600">
            {description}
          </p>
        ) : null}
      </div>

      {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
    </div>
  );
}
