import React from "react";
import Link from "next/link";

type PricingCardProps = {
  label: string;
  title: React.ReactNode;
  price?: string;
  priceMeta?: string[];
  offerText?: string;
  description?: React.ReactNode;
  features: string[];
  buttonLabel: string;
  variant?: "blue" | "dark";
  popular?: boolean;
  footerText?: React.ReactNode;
  termsText?: string;
};

export function PricingCard({
  label,
  title,
  price,
  priceMeta,
  offerText,
  description,
  features,
  buttonLabel,
  variant = "blue",
  popular = false,
  footerText,
  termsText,
}: PricingCardProps) {
  return (
    <article
      className={`w-full max-w-[360px] overflow-hidden rounded-md bg-[#f2f2f2] font-[Georgia,'Times_New_Roman',serif] shadow-[0_3px_10px_rgba(0,0,0,0.08)] ${
        popular ? "lg:-mt-5" : ""
      }`}
    >
      {popular && (
        <div className="bg-black py-3 text-center font-sans text-xs font-bold tracking-[1px] text-white sm:text-[0.95rem]">
          MOST POPULAR
        </div>
      )}

      <div className="px-5 pt-8 pb-6 text-center sm:px-[34px] sm:pt-[44px] sm:pb-[30px]">
        <p className="mb-2 font-sans text-[0.75rem] font-bold tracking-[1.5px] text-[#594d3f] sm:mb-[10px] sm:text-[0.85rem]">
          {label}
        </p>

        <h2
          className={`mb-4 text-center text-[2.4rem] leading-[0.95] font-medium break-words sm:text-[3rem] sm:leading-none ${
            variant === "dark" ? "text-[#111]" : "text-[#0a66c9]"
          }`}
        >
          {title}
        </h2>

        {price && (
          <div className="mb-3 flex items-start justify-center gap-2 sm:mb-2 sm:gap-[10px]">
            <span className="text-[2.9rem] font-bold leading-none text-[#111] sm:text-[3.7rem]">
              {price}
            </span>

            {priceMeta && (
              <div className="mt-1 flex flex-col text-left text-[0.85rem] leading-[1.1] text-[#111] sm:mt-[6px] sm:text-[0.95rem] sm:leading-[1.2]">
                {priceMeta.map((m) => (
                  <span key={m}>{m}</span>
                ))}
              </div>
            )}
          </div>
        )}

        {offerText ? (
          <p className="mb-5 text-center text-[0.92rem] leading-[1.35] text-[#111] sm:mb-[22px] sm:text-[0.95rem] sm:leading-[1.4]">
            {offerText}
          </p>
        ) : null}

        {description ? (
          <p className="mb-5 text-center text-[0.92rem] leading-[1.35] text-[#111] sm:mb-[22px] sm:text-[0.95rem] sm:leading-[1.4]">
            {description}
          </p>
        ) : null}

        <ul className="my-6 text-left sm:my-[30px]">
          {features.map((feature) => (
            <li
              key={feature}
              className="relative mb-3 pl-6 text-[0.95rem] leading-[1.35] text-[#111] last:mb-0 sm:mb-4 sm:pl-[26px] sm:text-[1rem]"
            >
              <span className="absolute left-0 top-0 font-bold">✓</span>
              {feature}
            </li>
          ))}
        </ul>

        <Link
          href="http://localhost:5001/subscription/payment"
          className={`mb-4 block w-full rounded-[4px] px-4 py-3 font-sans text-[0.95rem] font-bold sm:px-[18px] sm:py-[14px] sm:text-[1rem] text-center ${
            variant === "dark" ? "bg-[#666] text-white" : "bg-[#0a66c9] text-white"
          }`}
        >
          {buttonLabel}
        </Link>

        {footerText ? (
          <p className="mb-5 text-center text-[0.9rem] leading-[1.4] text-[#111] sm:mb-6 sm:text-[0.92rem] sm:leading-[1.45]">
            {footerText}
          </p>
        ) : null}

        {termsText ? (
          <a href="#" className="block text-center text-[0.9rem] text-[#555] underline sm:text-[0.95rem]">
            {termsText}
          </a>
        ) : null}
      </div>
    </article>
  );
}