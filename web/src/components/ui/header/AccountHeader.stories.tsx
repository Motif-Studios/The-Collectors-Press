import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AccountHeader } from "./AccountHeader";

const meta: Meta<typeof AccountHeader> = {
  title: "UI/Header/AccountHeader",
  component: AccountHeader,
};

export default meta;

type Story = StoryObj<typeof AccountHeader>;

export const Default: Story = {
  args: {
    user: {
      name: "Motif",
    },
    isSubscriber: false,
  },
};

export const Subscriber: Story = {
  args: {
    user: {
      name: "Motif",
    },
    isSubscriber: true,
  },
};