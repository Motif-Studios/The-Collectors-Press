import type { Meta, StoryObj } from "@storybook/nextjs";
import { AuthHeader } from "./AuthHeader";

const meta: Meta<typeof AuthHeader> = {
  title: "UI/Header/AuthHeader",
  component: AuthHeader,
};

export default meta;

type Story = StoryObj<typeof AuthHeader>;

export const Default: Story = {};