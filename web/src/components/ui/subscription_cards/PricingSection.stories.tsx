import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PricingSection } from "./PricingSection";

const meta: Meta<typeof PricingSection> = {
  title: "UI/PricingSection",
  component: PricingSection,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof PricingSection>;

export const Default: Story = {};