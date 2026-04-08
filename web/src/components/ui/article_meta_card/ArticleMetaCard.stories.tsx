import type { Meta, StoryObj } from "@storybook/nextjs";
import { ArticleMetaCard } from "./ArticleMetaCard";
import { ArticleStatusBadge } from "@/components/ui/article_status_badge/ArticleStatusBadge";

const meta: Meta<typeof ArticleMetaCard> = {
  title: "Studio/ArticleMetaCard",
  component: ArticleMetaCard,
};

export default meta;

type Story = StoryObj<typeof ArticleMetaCard>;

export const ExampleRow: Story = {
  render: () => {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <ArticleMetaCard label="Author">
          Kevin Wu
        </ArticleMetaCard>

        <ArticleMetaCard label="Category">
          <div className="flex items-center justify-between">
            <span>News</span>
            <span className="text-xs text-neutral-400">▼</span>
          </div>
        </ArticleMetaCard>

        <ArticleMetaCard label="Status">
          <ArticleStatusBadge status="draft" />
        </ArticleMetaCard>

        <ArticleMetaCard label="Last saved">
          2 minutes ago
        </ArticleMetaCard>
      </div>
    );
  },
};