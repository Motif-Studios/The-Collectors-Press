import type { Meta, StoryObj } from "@storybook/nextjs";
import { CoverUpload } from "./CoverUpload";

const meta: Meta<typeof CoverUpload> = {
  title: "Studio/CoverUpload",
  component: CoverUpload,
};

export default meta;

type Story = StoryObj<typeof CoverUpload>;

export const Default: Story = {
  args: {
    id: "cover-upload",
    name: "coverImage",
  },
};

export const WithOnChange: Story = {
  args: {
    id: "cover-upload-change",
    name: "coverImage",
    onChange: (e) => {
      const file = e.target.files?.[0];
      console.log("Selected file:", file);
    },
  },
};