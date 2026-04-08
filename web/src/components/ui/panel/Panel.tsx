import * as React from "react";

function cn(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

export type PanelProps = React.HTMLAttributes<HTMLElement>;

export function Panel({ className, ...props }: PanelProps) {
  return (
    <section
      className={cn("border border-[#ddd6cb] bg-white", className)}
      {...props}
    />
  );
}

export type PanelHeaderProps = {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  actions?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export function PanelHeader({
  title,
  subtitle,
  actions,
  className,
  ...props
}: PanelHeaderProps) {
  return (
    <div
      className={cn(
        "flex items-start justify-between gap-4 px-6 py-6",
        className
      )}
      {...props}
    >
      <div className="min-w-0 flex-1">
        {title ? (
          <h2 className="m-0 font-[Georgia,'Times_New_Roman',serif] text-[30px] leading-tight font-normal text-black">
            {title}
          </h2>
        ) : null}

        {subtitle ? (
          <div className="mt-4 text-[18px] leading-normal text-[#666]">
            {subtitle}
          </div>
        ) : null}
      </div>

      {actions ? <div className="shrink-0">{actions}</div> : null}
    </div>
  );
}

export type PanelBodyProps = React.HTMLAttributes<HTMLDivElement>;

export function PanelBody({ className, ...props }: PanelBodyProps) {
  return (
    <div
      className={cn(
        "px-6 py-6 text-[18px] leading-normal text-[#666] [&_a]:text-[#2e6da9] [&_a]:underline [&_p]:mb-4 [&_p:last-child]:mb-0 [&_h2]:m-0 [&_h2]:mb-[18px] [&_h2]:font-[Georgia,'Times_New_Roman',serif] [&_h2]:text-[30px] [&_h2]:leading-tight [&_h2]:font-normal [&_h2]:text-black",
        className
      )}
      {...props}
    />
  );
}

export type PanelFooterProps = React.HTMLAttributes<HTMLDivElement>;

export function PanelFooter({ className, ...props }: PanelFooterProps) {
  return (
    <div
      className={cn(
        "flex items-start justify-between gap-4 border-t border-[#ddd6cb] px-6 py-4 text-[16px] text-black [&_a]:font-['Courier_New',Courier,monospace] [&_a]:text-[#2e6da9] [&_a]:underline",
        className
      )}
      {...props}
    />
  );
}