export type SearchArticleResult = {
  id: string;
  title: string;
  summary: string;
  author: string;
  date: string;
  caption: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
};

export type SearchCategoryResult = {
  id: string;
  name: string;
  slug: string;
  href: string;
};

export type SearchPageData = {
  articles: SearchArticleResult[];
  categories: SearchCategoryResult[];
};