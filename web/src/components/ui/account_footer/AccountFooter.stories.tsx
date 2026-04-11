import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AccountFooter } from "./AccountFooter";

const meta: Meta<typeof AccountFooter> = {
  title: "Ui/AccountFooter",
  component: AccountFooter,
  parameters: {
    layout: "fullscreen", // so it looks like a real footer
  },
};

export default meta;

type Story = StoryObj<typeof AccountFooter>;

export const Default: Story = {};