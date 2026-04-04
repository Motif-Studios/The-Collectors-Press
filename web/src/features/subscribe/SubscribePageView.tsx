import { SubscriberBenefits } from "@/components/ui/subscriber_benefits/SubscriberBenefits";
import { PricingSection } from "@/components/ui/subscription_cards/PricingSection";

export async function SubscribePageView() {
  return (
    <div>
      <PricingSection />
      <SubscriberBenefits />
    </div>
  );
}
