import type { SecondaryNewsPanelProps } from "@/components/ui/news_panels/secondary";

export type Article = {
  id: string;
  slug: string;

  title: string;
  subtitle?: string;
  excerpt?: string;

  category?: string;

  status: "draft" | "published" | "archived";

  publishedAt?: string;
  updatedAt?: string;

  author: {
    id: string;
    name: string;
    description?: string;
    avatarSrc?: string;
    moreTopics?: string[];
  };

  coverImage?: {
    src: string;
    alt: string;
    caption?: string;
  };

  body: EditorJsContent;
};

export type EditorJsContent = {
  time?: number;
  version?: string;
  blocks: EditorJsBlock[];
};

export type EditorJsListItem = {
  content: string;
  meta?: {
    checked?: boolean;
  };
  items: EditorJsListItem[];
};

export type EditorJsBlock =
  | {
      id?: string;
      type: "paragraph";
      data: {
        text: string;
      };
    }
  | {
      id?: string;
      type: "header";
      data: {
        text: string;
        level: number;
      };
    }
  | {
      id?: string;
      type: "image";
      data: {
        file: {
          url: string;
        };
        caption?: string;
        withBorder?: boolean;
        withBackground?: boolean;
        stretched?: boolean;
      };
    }
  | {
      id?: string;
      type: "quote";
      data: {
        text: string;
        caption?: string;
        alignment?: "left" | "center";
      };
    }
  | {
      id?: string;
      type: "embed";
      data: {
        service: string;
        source: string;
        embed: string;
        width?: number;
        height?: number;
        caption?: string;
      };
    }
  | {
      id?: string;
      type: "delimiter";
      data: Record<string, never>;
    }
  | {
      id?: string;
      type: "list";
      data: {
        style: "ordered" | "unordered" | "checklist";
        meta?: {
          counterType?: string;
        };
        items: EditorJsListItem[];
      };
    };

export type ArticleSecondaryPanelData = {
  secondaryPanel: SecondaryNewsPanelProps;
};
