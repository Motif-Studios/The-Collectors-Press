import type { Meta, StoryObj } from "@storybook/nextjs";
import { ArticleCard } from "./ArticleCard";

const meta: Meta<typeof Footer> = {
  title: "UI/ArticleCard",
  component: ArticleCard,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ArticleCard>;

export const Default: Story = {
  render: () => (
    <div>
      <ArticleCard
        title="Kristi Noem Bought 11 Warehouses to Use as ICE Jails. Now What?"
        summary="DHS’s next leader will inherit a fast-moving $38 billion plan for industrial-scale immigrant detention."
        author="Nick Miroff"
        date="March 16, 2026"
        imageSrc="https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=900&q=80"
        imageAlt="Politics article image"
        caption="Illustration by The Atlantic. Sources: Al D..."
        href="/articles/kristi-noem-warehouses"
      />

       <ArticleCard
        title="Kristi Noem Bought 11 Warehouses to Use as ICE Jails. Now What?"
        summary="DHS’s next leader will inherit a fast-moving $38 billion plan for industrial-scale immigrant detention."
        author="Nick Miroff"
        date="March 16, 2026"
        imageSrc="https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=900&q=80"
        imageAlt="Politics article image"
        caption="Illustration by The Atlantic. Sources: Al D..."
        href="/articles/kristi-noem-warehouses"
      />

       <ArticleCard
        title="Kristi Noem Bought 11 Warehouses to Use as ICE Jails. Now What?"
        summary="DHS’s next leader will inherit a fast-moving $38 billion plan for industrial-scale immigrant detention."
        author="Nick Miroff"
        date="March 16, 2026"
        imageSrc="https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=900&q=80"
        imageAlt="Politics article image"
        caption="Illustration by The Atlantic. Sources: Al D..."
        href="/articles/kristi-noem-warehouses"
      />

       <ArticleCard
        title="Kristi Noem Bought 11 Warehouses to Use as ICE Jails. Now What?"
        summary="DHS’s next leader will inherit a fast-moving $38 billion plan for industrial-scale immigrant detention."
        author="Nick Miroff"
        date="March 16, 2026"
        imageSrc="https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=900&q=80"
        imageAlt="Politics article image"
        caption="Illustration by The Atlantic. Sources: Al D..."
        href="/articles/kristi-noem-warehouses"
      />

       <ArticleCard
        title="Kristi Noem Bought 11 Warehouses to Use as ICE Jails. Now What?"
        summary="DHS’s next leader will inherit a fast-moving $38 billion plan for industrial-scale immigrant detention."
        author="Nick Miroff"
        date="March 16, 2026"
        imageSrc="https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=900&q=80"
        imageAlt="Politics article image"
        caption="Illustration by The Atlantic. Sources: Al D..."
        href="/articles/kristi-noem-warehouses"
      />
    </div>
  ),
};
