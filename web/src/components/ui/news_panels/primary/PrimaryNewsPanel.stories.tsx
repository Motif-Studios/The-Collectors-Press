import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PrimaryNewsPanel } from "./PrimaryNewsPanel";
import type { PrimaryNewsPanelProps } from "./types";

const meta: Meta<typeof PrimaryNewsPanel> = {
  title: "Panels/PrimaryNewsPanel",
  component: PrimaryNewsPanel,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof PrimaryNewsPanel>;

const mockData: PrimaryNewsPanelProps = {
  feature: {
    id: "feature-1",
    imageSrc:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Featured story",
    type: "Opinion",
    section: "Chanticleer",
    title: "How this contrarian is betting against Australia’s great Ponzi scheme",
    summary:
      "Fund manager Martin Conlon says Australia’s economy is built on an unsustainable mix of high house prices and immigration.",
    href: "#",
  },
  stories: [
    {
      id: "1",
      kicker: "Sharemarket",
      title: "ASX publishing outage leads to market chaos and investor angst",
      summary:
        "Dozens of listed companies have been unable to issue updates all morning after the failure of the exchange's system, even with stocks trading as usual.",
      href: "#",
    },
    {
      id: "2",
      kicker: "Mergers & acquisitions",
      title: "AUB’s private equity suitors walk from $5b buyout of insurance broker",
      summary:
        "The company said EQT and CVC Capital Partners indicated they did not intend to proceed with a $45-per-share bid, and that it was confident in its strategy.",
      href: "#",
    },
    {
      id: "3",
      kicker: "Energy",
      title: "FIRB delays puts $100m energy retailer buyout on brink of collapse",
      summary:
        "TPC Consolidated had agreed to sell itself to Chinese government-backed Beijing Energy in March last year, but approval has not been forthcoming for 18 months.",
      href: "#",
    },
  ],
};

export const Default: Story = {
  args: mockData,
  render: (args) => (
      <PrimaryNewsPanel {...args} />
  ),
};