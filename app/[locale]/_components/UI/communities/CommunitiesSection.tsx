"use client";

import FilteredGridSection from "../shared/FilteredGridSection";

interface ApiImage {
  url: string;
  formats: {
    thumbnail?: { url: string };
    small?: { url: string };
    medium?: { url: string };
    large?: { url: string };
  };
}

interface ApiCommunity {
  id: number;
  slug: string;
  Location: string;
  Type: string;
  UnitType: string;
  statusType: string;
  HeroSection: {
    Title: string;
    MainImage: ApiImage;
  };
}

interface ApiResponse {
  data: ApiCommunity[];
  meta: {
    pagination: {
      total: number;
    };
  };
}

type CommunitiesPost = {
  id: number;
  title: string;
  location: string;
  Type: string;
  unitType: string;
  image: string;
  link: string;
  status?: string;
};

const formatLabel = (str: string) => {
  const uncamelCased = str.replace(/([A-Z])/g, " $1");
  return uncamelCased
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const getUniqueFilterOptions = (
  items: CommunitiesPost[],
  key: keyof CommunitiesPost
) => {
  const uniqueValues = Array.from(new Set(items.map((item) => item[key])));
  return [
    {
      value: "all",
      label: `All`,
    },
    ...uniqueValues.map((value) => ({
      value: value?.toString() || "",
      label: formatLabel(value?.toString() || ""),
    })),
  ];
};

const transformApiData = (apiData: ApiCommunity[]): CommunitiesPost[] => {
  if (!apiData || !Array.isArray(apiData)) return [];

  return apiData.map((item) => {
    const imageUrl =
      item.HeroSection?.MainImage?.formats?.medium?.url ||
      item.HeroSection?.MainImage?.url ||
      "/img/blog1.svg";

    return {
      id: item.id,
      title: item.HeroSection?.Title || "Untitled Project",
      location: item.Location || "Unknown Location",
      Type: item.Type || "Unknown Type",
      unitType: item.UnitType || "Unknown Unit Type",
      status: item.statusType || "ongoing",
      image: `${process.env.NEXT_PUBLIC_IMAGES_DOMAIN}${imageUrl}`,
      link: `/community/${item.slug || "static"}`,
    };
  });
};

export default function CommunitiesSection({
  apiData,
}: {
  apiData?: ApiResponse;
}) {
  // console.log("Raw API Data:", apiData);

  const communities = apiData ? transformApiData(apiData.data) : [];

  // console.log("Transformed Communities:", communities);

  const communityFilters = [
    {
      id: "location",
      title: "Location",
      options: getUniqueFilterOptions(communities, "location"),
    },
    {
      id: "Type",
      title: "Type",
      options: getUniqueFilterOptions(communities, "Type"),
    },
    {
      id: "unitType",
      title: "Unit Types",
      options: getUniqueFilterOptions(communities, "unitType"),
    },
  ];

  return (
    <FilteredGridSection
      items={communities}
      filters={communityFilters}
      filterButton={true}
      itemsPerPage={4}
      checkbox
      onFilterChange={(filters) => {
        // console.log("Filters changed:", filters);
      }}
    />
  );
}
