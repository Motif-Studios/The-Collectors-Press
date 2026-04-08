import type { Meta, StoryObj } from "@storybook/nextjs";
import { SubscriberBenefits } from "./SubscriberBenefits";

const meta: Meta<typeof SubscriberBenefits> = {
  title: "Ui/SubscriberBenefits",
  component: SubscriberBenefits,
};

export default meta;

type Story = StoryObj<typeof SubscriberBenefits>;

export const Default: Story = {};