import type { Meta, StoryObj } from "@storybook/nextjs";
import { Header } from "./Header";

const meta: Meta<typeof Header> = {
  title: "UI/Header/Header",
  component: Header,
};

export default meta;

type Story = StoryObj<typeof Header>;

const homepageNavItems = [
  { label: "Home", isActive: true },
  { label: "Latest news" },
  { label: "Herald NOW" },
  { label: "Video" },
  { label: "New Zealand" },
  { label: "Sport" },
  { label: "World" },
  { label: "Business" },
  { label: "Entertainment" },
  { label: "Podcasts" },
  { label: "Quizzes" },
  { label: "Opinion" },
  { label: "Lifestyle" },
  { label: "Travel" },
  { label: "Viva" },
  { label: "Weather" },
];

export const LoggedOut: Story = {
  render: () => (
    <Header navItems={homepageNavItems} user={null} isSubscriber={false} />
  ),
};

export const LoggedInNotSubscriber: Story = {
  render: () => (
    <Header
      navItems={homepageNavItems}
      user={{ name: "Motif" }}
      isSubscriber={false}
    />
  ),
};

export const LoggedInSubscriber: Story = {
  render: () => (
    <Header
      navItems={homepageNavItems}
      user={{ name: "Motif" }}
      isSubscriber={true}
    />
  ),
};
