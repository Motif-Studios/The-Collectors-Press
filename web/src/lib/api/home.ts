import type { FeatureStoryItem, StoryCardItem } from "@/components/ui/news_panels/primary/types";
import type { SecondaryMiniCardItem, SecondaryTextStoryItem, SecondaryTopStoryItem } from "@/components/ui/news_panels/secondary";
import { API_BASE_URL } from "@/lib/env";

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

const homeData = await getHomePageDataApi();

export async function normalisedPrimaryPanelFeaturedArticles(): Promise<FeatureStoryItem> {
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

export async function normalisedPrimaryPanelStories(): Promise<StoryCardItem[]> {
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

export async function normalisedSecondaryPanelTopStories(): Promise<SecondaryTopStoryItem[]> {
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

export async function normalisedSecondaryPanelStories(): Promise<SecondaryTextStoryItem[]> {
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

export async function normalisedSecondaryPanelMiniCards(): Promise<SecondaryMiniCardItem[]> {
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
  const homeDataResponse = await fetch(`${API_BASE_URL}/articles/home-data`);
  if (!homeDataResponse.ok) {
    console.error("Failed to fetch home page data:", homeDataResponse.statusText);
    return [];
  }
  const homeData = await homeDataResponse.json();
  return homeData;
}

export async function getHomePageDataNormalised(){
  const primaryPanelFeaturedArticles = await normalisedPrimaryPanelFeaturedArticles();
  const primaryPanelStories = await normalisedPrimaryPanelStories();
  const secondaryPanelTopStories = await normalisedSecondaryPanelTopStories();
  const secondaryPanelStories = await normalisedSecondaryPanelStories();
  const secondaryPanelMiniCards = await normalisedSecondaryPanelMiniCards();

  return {
    primaryPanel: {
      feature: primaryPanelFeaturedArticles,
      stories: primaryPanelStories,
    },
    secondaryPanel: {
      topStories: secondaryPanelTopStories,
      stories: secondaryPanelStories,
      miniCards: secondaryPanelMiniCards,
    },
  };
}