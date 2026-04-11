import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ArticleStatusBadge } from "./ArticleStatusBadge";

const meta: Meta<typeof ArticleStatusBadge> = {
  title: "Studio/ArticleStatusBadge",
  component: ArticleStatusBadge,
};

export default meta;

type Story = StoryObj<typeof ArticleStatusBadge>;

export const AllStatuses: Story = {
  render: () => (
    <div className="flex gap-4">
      <ArticleStatusBadge status="draft" />
      <ArticleStatusBadge status="published" />
    </div>
  ),
};