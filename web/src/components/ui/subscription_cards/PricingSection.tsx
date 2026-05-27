import React from "react";
import { PricingCard } from "./PricingCard";

export function PricingSection() {
  return (
    <section className="min-h-[calc(100vh-12rem)] flex items-center bg-blue-600 px-6 py-12">
      <div className="mx-auto w-full max-w-[1180px]">
        <div className="mb-12 text-center text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] opacity-90">
            Subscription options
          </p>
          <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
            Unlimited access to The Collectors Press
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-white/85">
            Choose the plan that suits you best. Both options include unlimited
            access to articles, features, and reporting across web and app.
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 place-items-center lg:grid-cols-2">
          <PricingCard
            id="monthly"
            label="MOST FLEXIBLE"
            title={
              <>
                Unlimited
                <br />
                Monthly
              </>
            }
            price="$18.75"
            priceMeta={["per week", "billed monthly"]}
            features={[
              "Unlimited access to The Collectors Press",
              "Read on web and in the app",
              "Cancel anytime",
            ]}
            buttonLabel="Choose Monthly"
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
            price="$7"
            priceMeta={["per year", "billed yearly"]}
            extraText="for your first 3 months (then $84/year)"
            features={[
              "Unlimited access to The Collectors Press",
              "Read on web and in the app",
              "Best value for regular readers",
            ]}
            buttonLabel="Choose Annual"
            popular
          />

          {/* <PricingCard
            id="business"
            label="BUSINESS"
            title={
              <>
                Team or
                <br />
                Enterprise
              </>
            }
            variant="dark"
            extraText={
              <>
                Subscription options tailored
                <br />
                for your organisation
              </>
            }
            features={[
              "Unlimited access for 3 or more subscribers",
              "Volume discounts available",
              "Personalised access on any device",
            ]}
            buttonLabel="Learn more"
          /> */}

        </div>
      </div>
    </section>
  );
}