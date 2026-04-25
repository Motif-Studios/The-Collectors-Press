import React from "react";
import { PricingCard } from "./PricingCard";

export function PricingSection() {
  return (
    <section className="min-h-10 bg-blue-600 py-10 px-6">
      <div className="max-w-[1180px] mx-auto">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 place-items-center">

          <PricingCard
            id="monthly"
            label="WEEKEND PAPER DELIVERY"
            title={
              <>
                Premium
                <br />
                Weekend
              </>
            }
            price="$18.75"
            priceMeta={["per week", "billed monthly"]}
            features={[
              "Saturday delivery of AFR Weekend",
              "In-depth weekend sections",
              "Includes Premium Digital access",
            ]}
            buttonLabel="Get Premium Weekend"
          />

          <PricingCard
            id="yearly"
            label="DIGITAL ACCESS"
            title={
              <>
                Premium
                <br />
                Digital
              </>
            }
            price="$7"
            priceMeta={["per week", "billed monthly"]}
            extraText="for your first 3 months"
            features={[
              "Unlimited access to afr.com and the app",
              "Gift 5 articles each month",
              "Curated daily newsletters from our expert newsroom",
            ]}
            buttonLabel="Save over 50%"
            popular
          />

          <PricingCard
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
          />

        </div>
      </div>
    </section>
  );
}