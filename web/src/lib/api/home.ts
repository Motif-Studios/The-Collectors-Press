import type { FeatureStoryItem, StoryCardItem } from "@/components/ui/news_panels/primary/types";
import type { SecondaryMiniCardItem, SecondaryTextStoryItem, SecondaryTopStoryItem } from "@/components/ui/news_panels/secondary";
import { API_BASE_URL_SERVER } from "@/lib/env";

type RawPrimaryFeature = {
  article_id?: string;
  id?: string;
  title?: string;
  preview_text?: string;
  description?: string;
  cover_image_url?: string;
  image_alt?: string;
  slug?: string;
  imageSrc?: string;
  imageAlt?: string;
  summary?: string;
  href?: string;
  type?: string;
  section?: string;
};

type HomeDataShape = {
  primaryPanel?: {
    feature?: RawPrimaryFeature;
    stories?: RawPrimaryFeature[];
  };
  secondaryPanel?: {
    topStories?: RawPrimaryFeature[];
    stories?: RawPrimaryFeature[];
    miniCards?: RawPrimaryFeature[];
  };
};

function normalisePrimaryPanelFeaturedArticles(homeData: HomeDataShape): FeatureStoryItem {
  const featurePrimary = homeData?.primaryPanel?.feature as RawPrimaryFeature | undefined;

  if (!featurePrimary) {
    return {
      id: "",
      imageSrc: "",
      imageAlt: "",
      type: "",
      section: "primary",
      title: "",
      summary: "",
      href: "",
    };
  }

  const normalisedJson: FeatureStoryItem = {
    id: featurePrimary.id ?? featurePrimary.article_id ?? "",
    imageSrc: featurePrimary.imageSrc ?? featurePrimary.cover_image_url ?? "",
    imageAlt: featurePrimary.imageAlt ?? featurePrimary.image_alt,
    type: featurePrimary.type ?? featurePrimary.preview_text,
    section: featurePrimary.section ?? "primary",
    title: featurePrimary.title ?? "",
    summary: featurePrimary.summary ?? featurePrimary.description,
    href: featurePrimary.href ?? (featurePrimary.slug ? `/article/${featurePrimary.slug}` : undefined),
  };
  
  return normalisedJson;
}

function normalisePrimaryPanelStories(homeData: HomeDataShape): StoryCardItem[] {
  const primaryStories = homeData?.primaryPanel?.stories as RawPrimaryFeature[] | undefined;

  if (!primaryStories) {
    return [{
      id: "",
      kicker: "",
      title: "",
      summary: "",
      href: "",
    }];
  }

  return primaryStories.map((story) => ({
    id: story.id ?? story.article_id ?? "",
    kicker: story.type ?? story.preview_text,
    title: story.title ?? "",
    summary: story.summary ?? story.description,
    href: story.href ?? (story.slug ? `/article/${story.slug}` : undefined),
  }));
}

function normaliseSecondaryPanelTopStories(homeData: HomeDataShape): SecondaryTopStoryItem[] {
  const secondaryTopStories = homeData?.secondaryPanel?.topStories as RawPrimaryFeature[] | undefined;

  if (!secondaryTopStories) {
    return [{
      id: "",
      categories: [],
      title: "",
    }, 
    {
      id: "",
      categories: [],
      title: "",
    }];
  }

  return secondaryTopStories.map((story) => ({
    id: story.id ?? story.article_id ?? "",
    categories: story.section ? [story.section] : undefined,
    title: story.title ?? "",
    summary: story.summary ?? story.description,
    imageSrc: story.imageSrc ?? story.cover_image_url,
    imageAlt: story.imageAlt ?? story.image_alt,
    href: story.href ?? (story.slug ? `/article/${story.slug}` : undefined),
  }));
}

function normaliseSecondaryPanelStories(homeData: HomeDataShape): SecondaryTextStoryItem[] {
  const secondaryStories = homeData?.secondaryPanel?.stories as RawPrimaryFeature[] | undefined;

  if (!secondaryStories) {
    return [];
  }

  return secondaryStories.map((story) => ({
    id: story.id ?? story.article_id ?? "",
    categories: story.section ? [story.section] : undefined,
    title: story.title ?? "",
    summary: story.summary ?? story.description,
    href: story.href ?? (story.slug ? `/article/${story.slug}` : undefined),
  }));
}

function normaliseSecondaryPanelMiniCards(homeData: HomeDataShape): SecondaryMiniCardItem[] {
  const secondaryMiniCards = homeData?.secondaryPanel?.miniCards as RawPrimaryFeature[] | undefined;

  if (!secondaryMiniCards) {
    return [];
  }

  return secondaryMiniCards.map((story) => ({
    id: story.id ?? story.article_id ?? "",
    category: story.section,
    title: story.title ?? "",
    href: story.href ?? (story.slug ? `/article/${story.slug}` : undefined),
    imageSrc: story.imageSrc ?? story.cover_image_url,
    imageAlt: story.imageAlt ?? story.image_alt,
  }));
}

export async function getHomePageDataApi() {
  try {
    const homeDataResponse = await fetch(`${API_BASE_URL_SERVER}/articles/home-data`);
    if (!homeDataResponse.ok) {
      return {};
    }
    const homeData = await homeDataResponse.json();
    return homeData ?? {};
  } catch {
    return {};
  }
}

export async function getHomePageDataNormalised(){
  const homeData = (await getHomePageDataApi()) as HomeDataShape;
  
  return {
    primaryPanel: {
      feature: normalisePrimaryPanelFeaturedArticles(homeData),
      stories: normalisePrimaryPanelStories(homeData),
    },
    secondaryPanel: {
      topStories: normaliseSecondaryPanelTopStories(homeData),
      stories: normaliseSecondaryPanelStories(homeData),
      miniCards: normaliseSecondaryPanelMiniCards(homeData),
    },
  };
}