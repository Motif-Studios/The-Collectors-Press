import type { Meta, StoryObj } from "@storybook/nextjs";
import { SelectInput } from "./SelectInput";

const meta: Meta<typeof SelectInput> = {
  title: "UI/SelectInput",
  component: SelectInput,
};

export default meta;

type Story = StoryObj<typeof SelectInput>;

export const Default: Story = {
  render: () => (
    <SelectInput>
      <option value="all-status">All status</option>
      <option value="draft">Draft</option>
      <option value="published">Published</option>
      <option value="scheduled">Scheduled</option>
      <option value="archived">Archived</option>
    </SelectInput>
  ),
};

export const Categories: Story = {
  render: () => (
    <SelectInput>
      <option value="all-categories">All categories</option>
      <option value="news">News</option>
      <option value="opinion">Opinion</option>
      <option value="culture">Culture</option>
      <option value="technology">Technology</option>
    </SelectInput>
  ),
};

export const Sort: Story = {
  render: () => (
    <SelectInput>
      <option value="newest">Newest first</option>
      <option value="oldest">Oldest first</option>
      <option value="recently-updated">Recently updated</option>
      <option value="a-z">A–Z</option>
    </SelectInput>
  ),
};