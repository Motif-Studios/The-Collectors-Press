import type { Meta, StoryObj } from "@storybook/nextjs";
import { PaywallCTA } from "./PaywallCTA";

const meta: Meta<typeof PaywallCTA> = {
  title: "UI/PaywallCTA",
  component: PaywallCTA,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof PaywallCTA>;

export const Default: Story = {
  render: () => (
    <div className="py-20 px-4">
      <PaywallCTA />
    </div>
  ),
};