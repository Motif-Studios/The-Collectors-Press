import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ArticleAuthorSection } from "./ArticleAuthorSection";

const meta: Meta<typeof ArticleAuthorSection> = {
  title: "UI/ArticleAuthorSection",
  component: ArticleAuthorSection,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ArticleAuthorSection>;

export const Default: Story = {
  render: () => (
    <div>
      <ArticleAuthorSection
        authorName="Charlie Warzel"
        authorPhoto="https://randomuser.me/api/portraits/men/32.jpg"
        authorDescription={
          <>
            <a href="#" className="underline">
              Charlie Warzel
            </a>{" "}
            is a staff writer at <em>The Atlantic</em> and the author of its
            newsletter{" "}
            <a href="#" className="underline">
              Galaxy Brain
            </a>
            , about technology, media, and big ideas. He can be reached via{" "}
            <a href="#" className="underline">
              email
            </a>
            .
          </>
        }
        moreTopics={["Donald Trump", "Iran", "Middle East"]}
      />
    </div>
  ),
};