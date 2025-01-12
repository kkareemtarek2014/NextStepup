"use client";

import FilteredGridSection from "../shared/FilteredGridSection";

interface ImageFormat {
  url: string;
  width: number;
  height: number;
}

interface ImageData {
  url: string;
  formats?: {
    large?: ImageFormat;
    medium?: ImageFormat;
    small?: ImageFormat;
    thumbnail?: ImageFormat;
  };
}

interface ApiMediaPost {
  id: number;
  documentId: string;
  Title: string;
  Description: string;
  Type: string;
  slug: string;
  Image: ImageData;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface ApiResponse {
  data: ApiMediaPost[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

type MediaPost = {
  id: number;
  title: string;
  category: string;
  date: string;
  image: string;
  description: string;
  link: string;
};

const mediaFilters = [
  {
    id: "category",
    title: "Type",
    options: [
      { value: "all", label: "All" },
      { value: "News", label: "News" },
      { value: "Events", label: "Events" },
    ],
  },
  {
    id: "sortBy",
    title: "Sort by",
    options: [
      { value: "latest", label: "Latest" },
      { value: "oldest", label: "Oldest" },
    ],
  },
];

const transformApiData = (apiData: ApiResponse): MediaPost[] => {
  if (!apiData?.data) return [];

  return apiData.data.map((item) => {
    const imageUrl =
      item.Image?.formats?.medium?.url || item.Image?.url || "/img/blog1.svg";

    return {
      id: item.id,
      title: item.Title,
      category: item.Type,
      date: new Date(item.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      image: `${process.env.NEXT_PUBLIC_IMAGES_DOMAIN}${imageUrl}`,
      description: item.Description,
      link: `/media/${item.slug}`,
    };
  });
};

interface MediaListSectionProps {
  apiData?: ApiResponse;
}

export default function MediaListSection({ apiData }: MediaListSectionProps) {
  const mediaItems = apiData ? transformApiData(apiData) : [];

  return (
    <FilteredGridSection
      items={mediaItems}
      filters={mediaFilters}
      itemsPerPage={4}
      page="media"
    />
  );
}
