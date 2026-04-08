import type { Meta, StoryObj } from "@storybook/nextjs";
import { ActionButton } from "./ActionButton";

const meta: Meta<typeof ActionButton> = {
  title: "UI/ActionButton",
  component: ActionButton,
};

export default meta;

type Story = StoryObj<typeof ActionButton>;

export const Default: Story = {
  args: {
    children: "Save draft",
  },
};

export const Primary: Story = {
  args: {
    children: "Create article",
    variant: "primary",
  },
};

export const AsLink: Story = {
  args: {
    children: "View site",
    href: "#",
  },
};

export const MultipleActions: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <ActionButton>Save draft</ActionButton>
      <ActionButton>Preview</ActionButton>
      <ActionButton variant="primary">Publish</ActionButton>
    </div>
  ),
};