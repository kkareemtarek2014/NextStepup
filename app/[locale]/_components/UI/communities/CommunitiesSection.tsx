"use client";

import FilteredGridSection from "../shared/FilteredGridSection";

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

// Helper function to capitalize and format
const formatLabel = (str: string) => {
  // Handle camelCase
  const uncamelCased = str.replace(/([A-Z])/g, " $1");
  return uncamelCased
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

// Function to get unique values and create filter options
const getUniqueFilterOptions = (
  items: CommunitiesPost[],
  key: keyof CommunitiesPost
) => {
  const uniqueValues = Array.from(new Set(items.map((item) => item[key])));
  return [
    {
      value: "all",
      //   label: `All ${key.charAt(0).toUpperCase() + key.slice(1)}s`,
      label: `All`,
    },
    ...uniqueValues.map((value) => ({
      value: value?.toString() || "",
      label: formatLabel(value?.toString() || ""),
    })),
  ];
};

const YOUR_COMMUNITIES_DATA: CommunitiesPost[] = [
  {
    id: 1,
    title: "The Heart of Ras El Hekma",
    location: "north Coast",
    Type: "Coastal",
    unitType: "Villa",
    status: "completed",
    image: "/img/blog1.svg",

    link: "/Community/static",
  },
  {
    id: 2,
    title: "Cairo Project",
    location: "cairo",
    Type: "Coastal",
    unitType: "Twin House",
    status: "completed",
    image: "/img/blog1.svg",
    link: "/Community/static",
  },
  {
    id: 3,
    title: "The Heart of Ras El Hekma",
    location: "north Coast",
    Type: "City",
    unitType: "Twin House",
    status: "completed",

    image: "/img/blog1.svg",

    link: "/Community/static",
  },
  {
    id: 4,
    title: "The Heart of Ras El Hekma",
    location: "north Coast",
    Type: "City",
    unitType: "Villa",
    status: "completed",
    image: "/img/blog1.svg",

    link: "/Community/static",
  },
  {
    id: 5,
    title: "The Heart of Ras El Hekma",
    location: "north Coast",
    Type: "City",
    unitType: "Villa",
    status: "ongoing",
    image: "/img/blog1.svg",

    link: "/Community/static",
  },
  {
    id: 6,
    title: "The Heart of Ras El Hekma",
    location: "north Coast",
    Type: "Coastal",
    unitType: "Apartment",
    status: "ongoing",
    image: "/img/blog1.svg",

    link: "/Community/static",
  },
  {
    id: 7,
    title: "The Heart of Ras El Hekma",
    location: "north Coast",
    Type: "Coastal",
    unitType: "Chalet",
    status: "ongoing",
    image: "/img/blog1.svg",

    link: "/Community/static",
  },
  {
    id: 8,
    title: "The Heart of Ras El Hekma",
    location: "october",
    Type: "Coastal",
    unitType: "Townhouse",
    status: "ongoing",
    image: "/img/blog1.svg",

    link: "/Community/static",
  },
  // ... add more items
];

export default function CommunitiesSection() {
  // Dynamically generate filter options
  const communityFilters = [
    {
      id: "location",
      title: "Location",
      options: getUniqueFilterOptions(YOUR_COMMUNITIES_DATA, "location"),
    },
    {
      id: "Type",
      title: "Type",
      options: getUniqueFilterOptions(YOUR_COMMUNITIES_DATA, "Type"),
    },
    {
      id: "unitType",
      title: "Unit Types",
      options: getUniqueFilterOptions(YOUR_COMMUNITIES_DATA, "unitType"),
    },
  ];

  return (
    <FilteredGridSection
      items={YOUR_COMMUNITIES_DATA}
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
