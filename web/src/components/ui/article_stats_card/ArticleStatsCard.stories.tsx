import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ArticleStatsCard } from "./ArticleStatsCard";

const meta: Meta<typeof ArticleStatsCard> = {
  title: "UI/ArticleStatsCard",
  component: ArticleStatsCard,
};

export default meta;

type Story = StoryObj<typeof ArticleStatsCard>;

export const Default: Story = {
  args: {
    label: "Total articles",
    value: 24,
  },
};

export const ArticlesSummaryRow: Story = {
  render: () => (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      <ArticleStatsCard label="Total articles" value={24} />
      <ArticleStatsCard label="Drafts" value={8} />
      <ArticleStatsCard label="Published" value={13} />
      <ArticleStatsCard label="Archived" value={3} />
    </div>
  ),
};