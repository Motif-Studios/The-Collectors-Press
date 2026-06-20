import React from "react";
import Link from "next/link";
import { getCurrentUser } from "@/features/auth/queries/getCurrentUser";
import { API_BASE_URL, API_BASE_URL_SERVER } from "@/lib/env";

type PricingCardProps = {
  id: string;
  label: string;
  title: React.ReactNode;
  price?: string;
  priceMeta?: string[];
  offerText?: string;
  extraText?: React.ReactNode;
  description?: React.ReactNode;
  features: string[];
  buttonLabel: string;
  variant?: "blue" | "dark" | "silver" | "gold";
  popular?: boolean;
  footerText?: React.ReactNode;
  termsText?: string;
};

async function getCheckoutUrl(id: string, user: { id: string } | null) {
  if (!user) return "/login";
  const endpoint = id === "monthly" || id === "yearly" ? id : null;
  if (!endpoint) return "/subscribe";

  try {
    const baseUrl = typeof window === "undefined" ? API_BASE_URL_SERVER : API_BASE_URL;
    const response = await fetch(`${baseUrl}/subscription/payment/${endpoint}?userId=${encodeURIComponent(user.id)}`, {
      method: "GET",
    });
    if (!response.ok) return "/subscribe";
    const data = await response.json();
    return data.url || "/subscribe";
  } catch {
    return "/subscribe";
  }
}

const variantStyles = {
  silver: {
    card: "bg-gradient-to-br from-[#d8d8d8] via-[#e8e8e8] to-[#b8b8b8]",
    title: "text-[#111]",
    button: "bg-[#111] text-white hover:bg-[#333]",
    label: "text-[#555]",
    price: "text-[#111]",
    priceMeta: "text-[#444]",
    feature: "text-[#222]",
    footerText: "text-[#444]",
    checkmark: "text-[#111]",
  },
  gold: {
    card: "bg-gradient-to-br from-[#d4a843] via-[#f0c060] to-[#a87820]",
    title: "text-[#111]",
    button: "bg-[#111] text-white hover:bg-[#333]",
    label: "text-[#6b4a00]",
    price: "text-[#111]",
    priceMeta: "text-[#4a3000]",
    feature: "text-[#1a1000]",
    footerText: "text-[#4a3000]",
    checkmark: "text-[#4a3000]",
  },
  blue: {
    card: "bg-[#f2f2f2]",
    title: "text-[#0a66c9]",
    button: "bg-[#0a66c9] text-white",
    label: "text-[#594d3f]",
    price: "text-[#111]",
    priceMeta: "text-[#111]",
    feature: "text-[#111]",
    footerText: "text-[#111]",
    checkmark: "text-[#111]",
  },
  dark: {
    card: "bg-[#f2f2f2]",
    title: "text-[#111]",
    button: "bg-[#666] text-white",
    label: "text-[#594d3f]",
    price: "text-[#111]",
    priceMeta: "text-[#111]",
    feature: "text-[#111]",
    footerText: "text-[#111]",
    checkmark: "text-[#111]",
  },
};

export async function PricingCard({
  id,
  label,
  title,
  price,
  priceMeta,
  offerText,
  extraText,
  description,
  features,
  buttonLabel,
  variant = "blue",
  popular = false,
  footerText,
  termsText,
}: PricingCardProps) {
  const user = await getCurrentUser();
  const checkoutUrl = await getCheckoutUrl(id, user);
  const styles = variantStyles[variant];

  return (
    <article
      className={`w-full max-w-[400px] overflow-hidden rounded-xl font-[Georgia,'Times_New_Roman',serif] shadow-[0_8px_32px_rgba(0,0,0,0.4)] ${styles.card} ${
        popular ? "lg:-mt-5 ring-2 ring-white/20" : ""
      }`}
    >
      {popular && label && (
        <div className="py-2.5 text-center font-sans text-xs font-bold tracking-[2px] text-[#4a3000] bg-black/15">
          {label}
        </div>
      )}

      <div className="px-8 pt-10 pb-8 text-center">
        {label && !popular && (
          <p className={`mb-2 font-sans text-[0.75rem] font-bold tracking-[2px] ${styles.label}`}>
            {label}
          </p>
        )}

        <h2
          className={`mb-6 text-center text-[2.8rem] leading-[0.95] font-bold break-words sm:text-[3.2rem] ${styles.title}`}
        >
          {title}
        </h2>

        {price && (
          <div className="mb-4 flex items-start justify-center gap-3">
            <span className={`text-[3.5rem] font-bold leading-none sm:text-[4rem] ${styles.price}`}>
              {price}
            </span>

            {priceMeta && (
              <div className={`mt-2 flex flex-col text-left text-[0.85rem] leading-[1.2] ${styles.priceMeta}`}>
                {priceMeta.map((m) => (
                  <span key={m}>{m}</span>
                ))}
              </div>
            )}
          </div>
        )}

        {extraText && (
          <p className={`mb-3 text-center text-[0.9rem] leading-[1.3] ${styles.priceMeta}`}>
            {extraText}
          </p>
        )}

        {offerText && (
          <p className={`mb-5 text-center text-[0.92rem] leading-[1.35] ${styles.feature}`}>
            {offerText}
          </p>
        )}

        {description && (
          <p className={`mb-5 text-center text-[0.92rem] leading-[1.35] ${styles.feature}`}>
            {description}
          </p>
        )}

        <ul className="my-6 text-left">
          {features.map((feature) => (
            <li
              key={feature}
              className={`relative mb-4 pl-7 text-[0.95rem] leading-[1.4] last:mb-0 ${styles.feature}`}
            >
              <span className={`absolute left-0 top-0 font-bold ${styles.checkmark}`}>✓</span>
              {feature}
            </li>
          ))}
        </ul>

        <Link
          href={checkoutUrl}
          className={`mb-4 block w-full rounded-[4px] px-4 py-3.5 font-sans text-[1rem] font-bold text-center transition-colors ${styles.button}`}
        >
          {buttonLabel}
        </Link>

        {footerText && (
          <p className={`mb-4 text-center text-[0.88rem] leading-[1.4] ${styles.footerText}`}>
            {footerText}
          </p>
        )}

        {termsText && (
          <a href="#" className={`block text-center text-[0.88rem] underline ${styles.footerText}`}>
            {termsText}
          </a>
        )}
      </div>
    </article>
  );
}