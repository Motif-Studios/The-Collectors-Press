import type { Meta, StoryObj } from "@storybook/nextjs";
import { useState } from "react";
import { SearchInput } from "./SearchInput";

const meta: Meta<typeof SearchInput> = {
  title: "UI/SearchInput",
  component: SearchInput,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof SearchInput>;

export const Default: Story = {
  render: () => (
    <div className="max-w-xl">
      <SearchInput />
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState("");

    return (
      <div className="max-w-xl space-y-4">
        <SearchInput
          value={value}
          onChange={setValue}
          onSubmit={(v) => {
            console.log("Submitted:", v);
          }}
        />

        <div className="text-sm text-neutral-600">
          Current value: <strong>{value || "empty"}</strong>
        </div>
      </div>
    );
  },
};