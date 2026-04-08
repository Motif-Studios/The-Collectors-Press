import {
  faChartColumn,
  faGlobe,
  faXmark,
  faMessage,
  faNewspaper,
  faDesktop,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

type Benefit = {
  icon: IconDefinition;
  title: string;
  description: string;
};

function BenefitItem({
  icon,
  title,
  description,
}: {
  icon: IconDefinition;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-4">
      {/* Icon */}
      <div className="text-orange-500 text-xl mt-1">
        <FontAwesomeIcon icon={icon} />
      </div>

      {/* Text */}
      <div>
        <h3 className="font-semibold text-sm text-black">{title}</h3>
        <p className="text-sm text-neutral-600 mt-1 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

const benefits: Benefit[] = [
  {
    icon: faChartColumn,
    title: "In-depth analysis",
    description:
      "Access to the very best of our content including business insights, in-depth analysis and investigative journalism",
  },
  {
    icon: faXmark,
    title: "Cancel anytime",
    description: "No lock in contract.",
  },
  {
    icon: faNewspaper,
    title: "At your fingertips",
    description:
      "Access newspaper e-editions, a digital replica of the Herald and Regional newspapers",
  },
  {
    icon: faGlobe,
    title: "Global content",
    description:
      "Expand your world view with content from leading global publishers",
  },
  {
    icon: faMessage,
    title: "Enhanced experience",
    description:
      "Subscriber-only features including curated newsletters, Q&A sessions and article commenting",
  },
  {
    icon: faDesktop,
    title: "Stay connected",
    description:
      "Stay connected with access on up to four devices including the NZ Herald app",
  },
];

export function SubscriberBenefits() {
  return (
    <section className="py-16 px-6">
      <div className="max-w-[1100px] mx-auto">
        <h2 className="text-center text-xl font-bold mb-10">
          Subscriber benefits
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {benefits.map((benefit, index) => (
            <BenefitItem key={index} {...benefit} />
          ))}
        </div>
      </div>
    </section>
  );
}