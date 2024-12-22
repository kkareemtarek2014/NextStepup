"use client";

import FilteredGridSection from "../shared/FilteredGridSection";
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
      { value: "news", label: "News" },
      { value: "events", label: "Events" },
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
const MEDIA_DATA: MediaPost[] = [
  {
    id: 1,
    title: "The Heart of Ras El Hekma",
    category: "news",
    date: "March 15, 2024",
    image: "/img/blog1.svg",
    description:
      "The first fully-integrated coastal resort at the heart of the North Coast's Ras El Hekma.",
    link: "/media/static",
  },
  {
    id: 2,
    title: "The Heart of Ras El Hekma",
    category: "news",
    date: "March 10, 2024",
    image: "/img/blog1.svg",
    description:
      "The first fully-integrated coastal resort at the heart of the North Coast's Ras El Hekma.",
    link: "/media/static",
  },
  {
    id: 3,
    title: "The Heart of Ras El Hekma",
    category: "news",
    date: "March 5, 2024",
    image: "/img/blog1.svg",
    description:
      "The first fully-integrated coastal resort at the heart of the North Coast's Ras El Hekma.",
    link: "/media/static",
  },
  {
    id: 4,
    title: "The Heart of Ras El Hekma",
    category: "news",
    date: "February 28, 2024",
    image: "/img/blog1.svg",
    description:
      "The first fully-integrated coastal resort at the heart of the North Coast's Ras El Hekma.",
    link: "/media/static",
  },
  {
    id: 5,
    title: "The Heart of Ras El Hekma",
    category: "news",
    date: "February 20, 2024",
    image: "/img/blog1.svg",
    description:
      "The first fully-integrated coastal resort at the heart of the North Coast's Ras El Hekma.",
    link: "/media/static",
  },
  {
    id: 6,
    title: "The Heart of Ras El Hekma",
    category: "events",
    date: "February 15, 2024",
    image: "/img/blog1.svg",
    description:
      "The first fully-integrated coastal resort at the heart of the North Coast's Ras El Hekma.",
    link: "/media/static",
  },
  {
    id: 7,
    title: "The Heart of Ras El Hekma",
    category: "events",
    date: "February 10, 2024",
    image: "/img/blog1.svg",
    description:
      "The first fully-integrated coastal resort at the heart of the North Coast's Ras El Hekma.",
    link: "/media/static",
  },
  {
    id: 8,
    title: "The Heart of Ras El Hekma",
    category: "events",
    date: "February 5, 2024",
    image: "/img/blog1.svg",
    description:
      "The first fully-integrated coastal resort at the heart of the North Coast's Ras El Hekma.",
    link: "/media/static",
  },
  // ... add more items
];

export default function MediaListSection() {
  return (
    <FilteredGridSection
      items={MEDIA_DATA}
      filters={mediaFilters}
      itemsPerPage={4}
      page="media"
    />
  );
}
