import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { FeatureStoryCard, StoryCard } from "./primary";
import {
  SecondaryMiniCard,
  SecondaryTextStoryCard,
  SecondaryTopStoryCard,
} from "./secondary";

const meta = {
  title: "Panels/ComposedPanels",
  tags: ["autodocs"],
} satisfies Meta;

export default meta;

type Story = StoryObj;

function ComposedHomepageSection() {
  const feature = {
    id: "feature-1",
    imageSrc:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Featured story",
    type: "Opinion",
    section: "Chanticleer",
    title:
      "How this contrarian is betting against Australia’s great Ponzi scheme",
    summary:
      "Fund manager Martin Conlon says Australia’s economy is built on an unsustainable mix of high house prices and immigration.",
    href: "#",
  };

  const sideStories = [
    {
      id: "story-1",
      kicker: "Sharemarket",
      title: "ASX publishing outage leads to market chaos and investor angst",
      summary:
        "Dozens of listed companies have been unable to issue updates all morning after the failure of the exchange's system.",
      href: "#",
    },
    {
      id: "story-2",
      kicker: "Energy",
      title:
        "FIRB delays puts $100m energy retailer buyout on brink of collapse",
      summary:
        "TPC Consolidated had agreed to sell itself to Beijing Energy, but approval has not been forthcoming.",
      href: "#",
    },
    {
      id: "story-3",
      kicker: "Retail",
      title: "Metcash first-half result savaged by lost tobacco sales",
      summary:
        "The company is the largest supplier to independent supermarkets in Australia.",
      href: "#",
    },
  ];

  const lowerStories = [
    {
      id: "lower-1",
      categories: ["Industrial relations"],
      title: "Bullying, other psych claims push workers’ compo losses near $2b",
      summary:
        "Psychological injury is the source of almost one in four claims in the public sector in NSW.",
      href: "#",
    },
    {
      id: "lower-2",
      categories: ["Wine & spirits", "US market"],
      title: "Penfolds owner Treasury Wine slashes value of US business",
      summary:
        "Sam Fischer, who started as chief executive in late October, is clearing the decks.",
      href: "#",
    },
  ];

  const miniCards = [
    {
      id: "mini-1",
      category: "AI",
      title: "Are AI chefs the way of the future? This restaurant thinks so",
      imageSrc:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80",
      imageAlt: "Restaurant kitchen",
      href: "#",
    },
    {
      id: "mini-2",
      category: "Luxury travel",
      title: "Why Christmas is the best time to visit Barcelona",
      imageSrc:
        "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=600&q=80",
      imageAlt: "Barcelona street",
      href: "#",
    },
    {
      id: "mini-3",
      category: "Luxury fashion",
      title: "The sway rebels against the NGV’s new blockbuster",
      imageSrc:
        "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=600&q=80",
      imageAlt: "Fashion portrait",
      href: "#",
    },
    {
      id: "mini-4",
      category: "Motorsport",
      title: "‘No words’: Piastri speechless at McLaren error as...",
      imageSrc:
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80",
      imageAlt: "Race car",
      href: "#",
    },
  ];

  return (
    <section className="mx-auto max-w-275 px-5 py-6">
      <div className="grid grid-cols-[1.35fr_0.95fr] gap-8 max-[900px]:grid-cols-1">
        <div>
          <FeatureStoryCard {...feature} />
        </div>

        <div className="border-l border-[#d7d7d7] pl-6 max-[900px]:border-l-0 max-[900px]:border-t max-[900px]:pl-0 max-[900px]:pt-6">
          <div className="flex flex-col">
            {sideStories.map((story) => (
              <StoryCard key={story.id} {...story} />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-6 border-t border-[#d7d7d7] pt-6 max-[900px]:grid-cols-1">
        {lowerStories.map((story) => (
          <SecondaryTextStoryCard key={story.id} {...story} />
        ))}
      </div>

      <div className="mt-8 grid grid-cols-4 gap-5 border-t border-[#d7d7d7] pt-6 max-[900px]:grid-cols-2 max-[560px]:grid-cols-1">
        {miniCards.map((card) => (
          <SecondaryMiniCard key={card.id} {...card} />
        ))}
      </div>
    </section>
  );
}

function SplitLeadPanel() {
  const leadStory = {
    id: "lead-1",
    categories: ["Markets", "Analysis"],
    title: "Shares fall as ASX outage hits 80 stocks; bitcoin falls 4pc",
    summary:
      "ASX falls as market operator fixes announcements outage while broader investor nerves continue.",
    imageSrc:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=600&q=80",
    imageAlt: "Markets chart",
    href: "#",
  };

  const rightStories = [
    {
      id: "right-1",
      kicker: "Energy",
      title:
        "FIRB delays puts $100m energy retailer buyout on brink of collapse",
      summary:
        "TPC Consolidated had agreed to sell itself to Beijing Energy in March last year.",
      href: "#",
    },
    {
      id: "right-2",
      kicker: "Retail",
      title: "Metcash first-half result savaged by lost tobacco sales",
      summary:
        "The company is the largest supplier to independent supermarkets in Australia.",
      href: "#",
    },
  ];

  const miniCards = [
    {
      id: "mini-1",
      category: "AI",
      title: "Are AI chefs the way of the future? This restaurant thinks so",
      imageSrc:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80",
      href: "#",
    },
    {
      id: "mini-2",
      category: "Travel",
      title: "Why Christmas is the best time to visit Barcelona",
      imageSrc:
        "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=600&q=80",
      href: "#",
    },
    {
      id: "mini-3",
      category: "Fashion",
      title: "The sway rebels against the NGV’s new blockbuster",
      imageSrc:
        "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=600&q=80",
      href: "#",
    },
  ];

  return (
    <section className="mx-auto max-w-275 px-5 py-6">
      <div className="grid grid-cols-[1.1fr_0.9fr] gap-8 max-[900px]:grid-cols-1">
        <SecondaryTopStoryCard {...leadStory} />

        <div className="flex flex-col border-l border-[#d7d7d7] pl-6 max-[900px]:border-l-0 max-[900px]:border-t max-[900px]:pl-0 max-[900px]:pt-6">
          {rightStories.map((story) => (
            <StoryCard key={story.id} {...story} />
          ))}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-3 gap-5 border-t border-[#d7d7d7] pt-6 max-[900px]:grid-cols-2 max-[560px]:grid-cols-1">
        {miniCards.map((card) => (
          <SecondaryMiniCard key={card.id} {...card} />
        ))}
      </div>
    </section>
  );
}

export const HomepageSection: Story = {
  render: () => <ComposedHomepageSection />,
};

export const SplitLead: Story = {
  render: () => <SplitLeadPanel />,
};
