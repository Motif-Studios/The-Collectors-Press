import React from "react";
import { PricingCard } from "./PricingCard";

export function PricingSection() {
  return (
    <section className="min-h-[calc(100vh-12rem)] flex items-center bg-black px-6 py-12">
      <div className="mx-auto w-full max-w-[1180px]">
        <div className="mb-12 text-center text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/70">
            Subscription options
          </p>
          <h2 className="mt-3 font-[Georgia,'Times_New_Roman',serif] text-4xl font-bold md:text-5xl">
            Unlimited access to The Collectors Press
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-white/70">
            Choose the plan that works for you. Both options include unlimited
            access to articles.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 place-items-center lg:grid-cols-2">
          <PricingCard
            id="monthly"
            label=""
            title={
              <>
                Unlimited
                <br />
                Monthly
              </>
            }
            price="$18.75"
            priceMeta={["per month", "billed monthly"]}
            features={[
              "Unlimited access to The Collectors Press",
              "Cancel anytime",
            ]}
            buttonLabel="Choose Monthly"
            variant="silver"
          />

          <PricingCard
            id="yearly"
            label="BEST VALUE"
            title={
              <>
                Unlimited
                <br />
                Annual
              </>
            }
            price="$99"
            priceMeta={["per year", "billed yearly"]}
            features={[
              "Unlimited access to The Collectors Press",
              "Best value for regular readers",
            ]}
            buttonLabel="Choose Annual"
            variant="gold"
            popular
          />
        </div>
      </div>
    </section>
  );
}