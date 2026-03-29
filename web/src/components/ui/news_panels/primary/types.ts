export type StoryCardItem = {
  id: string;
  kicker?: string;
  title: string;
  summary?: string;
  href?: string;
};

export type FeatureStoryItem = {
  id: string;
  imageSrc: string;
  imageAlt?: string;
  type?: string;
  section?: string;
  title: string;
  summary?: string;
  href?: string;
};

export type PrimaryNewsPanelProps = {
  feature: FeatureStoryItem;
  stories: StoryCardItem[];
  className?: string;
};
