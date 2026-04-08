import type { Meta, StoryObj } from "@storybook/nextjs";
import { Icon } from "./Icon";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";

const meta: Meta<typeof Icon> = {
  title: "UI/Icon",
  component: Icon,
};

export default meta;

type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  args: {
    icon: faArrowUpRightFromSquare,
  },
};

export const WithClassName: Story = {
  args: {
    icon: faArrowUpRightFromSquare,
    className: "text-lg text-blue-500",
  },
};

export const BrandIcon: Story = {
  args: {
    icon: faInstagram,
    className: "text-pink-500 text-xl",
  },
};