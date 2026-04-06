import type { Meta, StoryObj } from "@storybook/nextjs";
import { EditorCard } from "./EditorCard";

const meta: Meta<typeof EditorCard> = {
  title: "Studio/EditorCard",
  component: EditorCard,
};

export default meta;

type Story = StoryObj<typeof EditorCard>;

export const Default: Story = {
  render: () => (
      <EditorCard>
        <h3 className="text-base font-semibold">Editor section</h3>
        <p className="mt-2 text-sm text-neutral-600">
          This is a simple reusable card for studio and editor pages.
        </p>
      </EditorCard>
  ),
};