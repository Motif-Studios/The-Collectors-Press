import type { Meta, StoryObj } from "@storybook/nextjs";
import { SavedStoryCard } from "./SavedStoryCard";

const meta: Meta<typeof SavedStoryCard> = {
  title: "UI/SavedStoryCard",
  component: SavedStoryCard,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof SavedStoryCard>;

export const Default: Story = {
  args: {
    title: "Can’t Stop It, So Lead It",
    author: "David Frum",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80",
  },
};

export const WithLongTitle: Story = {
  args: {
    title:
      "This is a much longer story title to test how the layout behaves when content wraps onto multiple lines",
    author: "Jane Doe",
    image:
      "https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&w=600&q=80",
  },
};

export const MultipleItems: Story = {
  render: () => {
    const items = [
      {
        id: "1",
        title: "Can’t Stop It, So Lead It",
        author: "David Frum",
        image:
          "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80",
      },
      {
        id: "2",
        title: "The Future of Minimalist Design",
        author: "Alex Carter",
        image:
          "https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&w=600&q=80",
      },
    ];

    return (
      <div>
        {items.map((item) => (
          <SavedStoryCard
            key={item.id}
            title={item.title}
            author={item.author}
            image={item.image}
            onRemove={() => console.log("remove", item.id)}
          />
        ))}
      </div>
    );
  },
};