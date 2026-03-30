import type { Meta, StoryObj } from "@storybook/nextjs";
import { SubscribeHeader } from "./SubscribeHeader";

const meta: Meta<typeof SubscribeHeader> = {
  title: "UI/Header/SubscribeHeader",
  component: SubscribeHeader,
};

export default meta;

type Story = StoryObj<typeof SubscribeHeader>;

export const LoggedOut: Story = {
  args: {
    user: null,
  },
};

export const LoggedIn: Story = {
  args: {
    user: {
      name: "Motif",
    },
  },
};