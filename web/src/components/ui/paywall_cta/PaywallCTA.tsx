import React from "react";

function classNameHelper(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

export type PaywallCTAProps = {
  className?: string;
};

export function PaywallCTA({ className }: PaywallCTAProps) {
  return (
    <section
      className={classNameHelper(
        "mx-auto max-w-[700px] text-center text-black",
        className
      )}
    >
      <p className="mb-6 font-sans text-[12px] font-bold uppercase tracking-[1.7px] text-[#111] sm:mb-[26px]">
        Keep reading <em className="font-serif normal-case tracking-normal">the Atlantic.</em>
      </p>

      <h2 className="mb-7 font-serif text-[1.4rem] leading-[1.35] font-medium sm:text-[1.05rem]">
        Get essential journalism for historic times.
        <br />
        For less than <span className="line-through">$2.77</span> $1.73 a week.
      </h2>

      <div className="mx-auto mb-7 grid max-w-[320px] grid-cols-1 gap-6 sm:max-w-[500px] sm:grid-cols-[1fr_42px_1fr] sm:gap-[18px]">
        <div className="text-center">
          <p className="mb-[18px] font-serif text-[0.98rem] leading-[1.45]">
            Subscribe for one year of access
            <br />
            and a role in supporting
            <br />
            independent journalism.
          </p>

          <a
            href="#"
            className="inline-block min-w-[142px] rounded-[2px] bg-[#d71920] px-[18px] py-[11px] font-sans text-[12px] font-bold uppercase tracking-[1px] text-white no-underline"
          >
            Subscribe
          </a>
        </div>

        <div className="relative flex min-h-[24px] items-center justify-center sm:min-h-[126px]">
          <span className="bg-[#f4f4f4] px-0 py-1 font-serif text-[0.9rem] lowercase">
            or
          </span>

          <div className="absolute left-1/2 top-0 hidden h-[calc(50%-14px)] w-px -translate-x-1/2 bg-[#111] sm:block" />
          <div className="absolute bottom-0 left-1/2 hidden h-[calc(50%-14px)] w-px -translate-x-1/2 bg-[#111] sm:block" />
        </div>

        <div className="text-center">
          <p className="mb-[18px] font-serif text-[0.98rem] leading-[1.45]">
            Try 30 days free and see how
            <br />
            <em>The Atlantic</em> fits into your
            <br />
            daily routine.
          </p>

          <a
            href="#"
            className="inline-block min-w-[142px] rounded-[2px] bg-[#d71920] px-[18px] py-[11px] font-sans text-[12px] font-bold uppercase tracking-[1px] text-white no-underline"
          >
            Start free trial
          </a>
        </div>
      </div>

      <p className="font-sans text-[12px] font-bold uppercase tracking-[1.3px] text-[#111]">
        Already have an account?{" "}
        <a href="#" className="text-[#2a5c8a] underline underline-offset-[2px]">
          Sign in
        </a>
      </p>
    </section>
  );
}