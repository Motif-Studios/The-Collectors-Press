import type { Meta, StoryObj } from "@storybook/nextjs";
import { CategoryBanner } from "./CategoryBanner";

const meta: Meta<typeof CategoryBanner> = {
  title: "UI/CategoryBanner",
  component: CategoryBanner,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof CategoryBanner>;

export const Default: Story = {
  args: {
    category: "POLITICS",
  },
};


export const Tech: Story = {
  args: {
    category: "TECH",
  },
};

export const Short: Story = {
  args: {
    category: "AI",
  },
};

export const LongCategory: Story = {
  args: {
    category: "TECHNOLOGY & INNOVATION",
  },
};