export interface MediaImage {
  url: string;
  alternativeText: string;
  formats?: {
    large?: { url: string };
    medium?: { url: string };
    small?: { url: string };
  };
}

export interface ContentChild {
  text: string;
  type: string;
  url?: string;
}

export interface ContentBlock {
  type: string;
  level?: number;
  children: ContentChild[];
  image?: MediaImage;
}

export interface MediaItem {
  Image: any;
  id: number;
  documentId: string;
  Title: string;
  Description: string;
  slug: string;
  Content: ContentBlock[];
  publishedAt: string;
  Type: string;
}

export interface MediaResponse {
  data: MediaItem[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface SingleMediaProps {
  data: MediaResponse;
}
