import React from "react";
import "./SavedStoryCard.css";
import Image from "next/image";

export type SavedStoryCardProps = {
  title: string;
  author: string;
  image: string;
  imageAlt?: string;
  onRemove?: () => void;
};

export function SavedStoryCard({
  title,
  author,
  image,
  imageAlt = "Saved story thumbnail",
  onRemove,
}: SavedStoryCardProps) {
  return (
    <article className="saved-story-item">
      <div className="saved-story-image">
        <Image src={image} alt={imageAlt} fill sizes="(max-width: 700px) 100vw, 160px" className="object-cover" />
      </div>

      <div className="saved-story-item__content">
        <h2>{title}</h2>
        <p>By {author}</p>
      </div>

      <button
        className="saved-story-remove"
        aria-label={`Remove saved story: ${title}`}
        onClick={onRemove}
        type="button"
      >
        ×
      </button>
    </article>
  );
}
