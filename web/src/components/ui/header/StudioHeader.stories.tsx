import type { Meta, StoryObj } from "@storybook/nextjs";
import { StudioHeader } from "./StudioHeader";

const meta: Meta<typeof StudioHeader> = {
  title: "UI/Header/Studio",
  component: StudioHeader,
};

export default meta;

type Story = StoryObj<typeof StudioHeader>;

export const Default: Story = {
  args: {
    user: {
      name: "Motif",
    },
  },
};