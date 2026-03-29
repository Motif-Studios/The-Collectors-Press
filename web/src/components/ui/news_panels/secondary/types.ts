export type SecondaryTopStoryItem = {
  id: string;
  categories?: string[];
  title: string;
  summary?: string;
  href?: string;
  imageSrc?: string;
  imageAlt?: string;
};

export type SecondaryTextStoryItem = {
  id: string;
  categories?: string[];
  title: string;
  summary?: string;
  href?: string;
};

export type SecondaryMiniCardItem = {
  id: string;
  category?: string;
  title: string;
  href?: string;
  imageSrc?: string;
  imageAlt?: string;
};

export type SecondaryNewsPanelProps = {
  topStories: [SecondaryTopStoryItem, SecondaryTopStoryItem];
  stories: SecondaryTextStoryItem[];
  miniCards: SecondaryMiniCardItem[];
  className?: string;
};