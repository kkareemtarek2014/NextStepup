"use client";

import { useState } from "react";
import Image from "next/image";
import CustomSelect from "../General/CustomSelect";

// Define types
type MediaPost = {
  id: number;
  title: string;
  category: string;
  date: string;
  image: string;
  description: string;
};

type FilterType = "all" | "news" | "events";
type SortType = "latest" | "oldest";

// Static data
const MEDIA_DATA: MediaPost[] = [
  {
    id: 1,
    title: "The Heart of Ras El Hekma",
    category: "news",
    date: "March 15, 2024",
    image: "/img/blog1.svg",
    description:
      "The first fully-integrated coastal resort at the heart of the North Coast's Ras El Hekma.",
  },
  {
    id: 2,
    title: "The Heart of Ras El Hekma",
    category: "news",
    date: "March 10, 2024",
    image: "/img/blog1.svg",
    description:
      "The first fully-integrated coastal resort at the heart of the North Coast's Ras El Hekma.",
  },
  {
    id: 3,
    title: "The Heart of Ras El Hekma",
    category: "news",
    date: "March 5, 2024",
    image: "/img/blog1.svg",
    description:
      "The first fully-integrated coastal resort at the heart of the North Coast's Ras El Hekma.",
  },
  {
    id: 4,
    title: "The Heart of Ras El Hekma",
    category: "news",
    date: "February 28, 2024",
    image: "/img/blog1.svg",
    description:
      "The first fully-integrated coastal resort at the heart of the North Coast's Ras El Hekma.",
  },
  {
    id: 5,
    title: "The Heart of Ras El Hekma",
    category: "news",
    date: "February 20, 2024",
    image: "/img/blog1.svg",
    description:
      "The first fully-integrated coastal resort at the heart of the North Coast's Ras El Hekma.",
  },
  {
    id: 6,
    title: "The Heart of Ras El Hekma",
    category: "events",
    date: "February 15, 2024",
    image: "/img/blog1.svg",
    description:
      "The first fully-integrated coastal resort at the heart of the North Coast's Ras El Hekma.",
  },
  {
    id: 7,
    title: "The Heart of Ras El Hekma",
    category: "events",
    date: "February 10, 2024",
    image: "/img/blog1.svg",
    description:
      "The first fully-integrated coastal resort at the heart of the North Coast's Ras El Hekma.",
  },
  {
    id: 8,
    title: "The Heart of Ras El Hekma",
    category: "events",
    date: "February 5, 2024",
    image: "/img/blog1.svg",
    description:
      "The first fully-integrated coastal resort at the heart of the North Coast's Ras El Hekma.",
  },
  // ... add more items
];

const typeOptions = [
  { value: "all", label: "All" },
  { value: "news", label: "News" },
  { value: "events", label: "Events" },
] as const;
const sortOptions = [
  { value: "latest", label: "Latest" },
  { value: "oldest", label: "Oldest" },
];

const ITEMS_PER_PAGE = 4;

export default function MediaListSection() {
  const [filterType, setFilterType] = useState<FilterType>("all");
  const [sortBy, setSortBy] = useState<SortType>("latest");
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);

  // Filter and sort logic
  const filteredAndSortedPosts = MEDIA_DATA.filter((post) =>
    filterType === "all"
      ? true
      : post.category.toLowerCase() === filterType.toLowerCase()
  ).sort((a, b) => {
    if (sortBy === "latest") {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  const displayedPosts = filteredAndSortedPosts.slice(0, visibleItems);
  const hasMore = filteredAndSortedPosts.length > visibleItems;

  const handleLoadMore = () => {
    setVisibleItems((prev) => prev + ITEMS_PER_PAGE);
  };

  return (
    <section className="relative h-fit py-[40px] bg-white">
      <div className="flex flex-col gap-[48px] max-w-[1400px] mx-auto px-4 lg:px-0">
        <div className="flex justify-between gap-[9px] lg:gap-0">
          <CustomSelect
            id="type-filter"
            title="Type"
            options={typeOptions}
            value={filterType}
            onChange={(value: string) => {
              console.log("Selected filter type:", value);
              setFilterType(value as FilterType);
              setVisibleItems(ITEMS_PER_PAGE);
            }}
            size="small"
          />
          <CustomSelect
            id="sort-filter"
            title="Sort by"
            options={sortOptions}
            value={sortBy}
            onChange={(value) => {
              setSortBy(value as SortType);
              setVisibleItems(ITEMS_PER_PAGE);
            }}
            size="small"
          />
        </div>

        {/* Media Grid */}
        <div className="flex flex-col  gap-[48px]">
          <div className="grid grid-cols-1  lg:grid-cols-2 gap-[20px]">
            {displayedPosts.map((post) => (
              <div
                key={post.id}
                className="bg-gray-100 relative flex flex-col "
              >
                <div className="relative h-full">
                  <div className="relative h-[148px] lg:h-[320px]">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative w-full">
                    <div className="bg-teamColor p-5 lg:p-[28px] lg:pb-[48px]">
                      <div className="flex flex-col gap-3 w-fit max-w-[554px]">
                        <span className="text-base font-medium text-primary leading-[22.4px] capitalize">
                          {post.category} - {post.date}
                        </span>
                        <h3 className="text-[28px] lg:text-[40px] font-medium leading-[35px] lg:leading-[50px] text-black text-balance">
                          {post.title}
                        </h3>
                        <p className="text-base lg:text-xl font-medium text-black line-clamp-2 ">
                          {post.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {hasMore && (
            <div className="flex justify-center">
              <button
                onClick={handleLoadMore}
                className="px-8 py-3 bg-white text-black border-black border hover:bg-black hover:text-white transition-all duration-300 rounded-[100px] font-medium hover:opacity-90 "
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
