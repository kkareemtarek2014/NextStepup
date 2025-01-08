"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import CustomSelect from "../General/CustomSelect";
import Link from "next/link";
import ArrowIcon from "../../Icons/ArrowIcon";
import Button from "../General/Button";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

type BasePost = {
  id: number;
  title: string;
  category?: string;
  location?: string;
  status?: string;
  type?: string;
  date?: string;
  image: string;
  description?: string;
  link: string;
};

type FilterConfig = {
  id: string;
  title: string;
  options: { value: string; label: string }[];
  showClearConfirm?: boolean;
};

interface FilteredGridSectionProps<T extends BasePost> {
  items: T[];
  filters: FilterConfig[];
  itemsPerPage?: number;
  onFilterChange?: (filters: Record<string, string | string[]>) => void;
  className?: string;
  page?: string;
  filterButton?: boolean;
  checkbox?: boolean;
}

export default function FilteredGridSection<T extends BasePost>({
  items,
  filters,
  itemsPerPage = 4,
  page,
  onFilterChange,
  className = "",
  filterButton = false,
  checkbox = false,
}: FilteredGridSectionProps<T>) {
  const [filterValues, setFilterValues] = useState<
    Record<string, string | string[]>
  >(
    Object.fromEntries(
      filters.map((filter) => [
        filter.id,
        checkbox ? ["all"] : filter.options[0].value,
      ])
    )
  );
  const [activeFilters, setActiveFilters] = useState<
    Record<string, string | string[]>
  >(
    Object.fromEntries(
      filters.map((filter) => [
        filter.id,
        checkbox ? ["all"] : filter.options[0].value,
      ])
    )
  );
  const [visibleItems, setVisibleItems] = useState(itemsPerPage);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const previousItems = useRef<T[]>([]);

  useEffect(() => {
    if (!items.length) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.set([".filter-controls", ".grid-item"], {
        y: 50,
        opacity: 0,
      });

      timelineRef.current = gsap.timeline({ paused: true });

      timelineRef.current
        .to(".filter-controls", {
          y: 0,
          opacity: 1,
          duration: 0.3,
          stagger: 0.05,
          ease: "power3.out",
        })
        .to(
          ".grid-item",
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            stagger: {
              each: 0.08,
              grid: "auto",
              from: "start",
            },
            ease: "power3.out",
          },
          "-=0.2"
        );

      const startAnimation = () => {
        setTimeout(() => {
          timelineRef.current?.play();
        }, 300);
      };

      window.addEventListener("pageTransitionComplete", startAnimation);

      return () => {
        window.removeEventListener("pageTransitionComplete", startAnimation);
        ctx.revert();
      };
    });
  }, [items]);

  useEffect(() => {
    if (previousItems.current !== items) {
      const tl = gsap.timeline();

      tl.to(".grid-item", {
        scale: 0.98,
        opacity: 0,
        y: 20,
        duration: 0.3,
        stagger: {
          each: 0.05,
          grid: "auto",
          from: "start",
        },
        ease: "power2.in",
      }).to(".grid-item", {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: {
          each: 0.08,
          grid: "auto",
          from: "start",
        },
        ease: "power3.out",
      });

      previousItems.current = items;
    }
  }, [items, filterValues, activeFilters]);

  useEffect(() => {
    if (isMobileFilterOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileFilterOpen]);
  const filteredItems = items
    .filter((item) => {
      return Object.entries(filterButton ? activeFilters : filterValues).every(
        ([filterId, value]) => {
          const values = Array.isArray(value) ? value : [value];

          if (values.includes("all")) return true;
          if (filterId === "sortBy") return true;

          const itemValue = (item as any)[filterId]
            ?.toString()
            .toLowerCase()
            .replace(/\s+/g, "");

          if (!itemValue) return false;

          return values.some(
            (val) => val.toLowerCase().replace(/\s+/g, "") === itemValue
          );
        }
      );
    })
    .sort((a, b) => {
      if (filterValues.sortBy && a.date && b.date) {
        try {
          const dateA = new Date(a.date).getTime();
          const dateB = new Date(b.date).getTime();

          if (!isNaN(dateA) && !isNaN(dateB)) {
            if (filterValues.sortBy === "latest") {
              return dateB - dateA;
            } else if (filterValues.sortBy === "oldest") {
              return dateA - dateB;
            }
          }
        } catch (error) {
          console.warn("Invalid date format in items", { a, b });
        }
      }
      return 0;
    });

  const displayedItems = filteredItems.slice(0, visibleItems);
  const hasMore = filteredItems.length > visibleItems;

  const handleFilterChange = (filterId: string, value: string | string[]) => {
    setFilterValues((prev) => ({
      ...prev,
      [filterId]: value,
    }));

    if (!filterButton) {
      setActiveFilters((prev) => ({
        ...prev,
        [filterId]: value,
      }));
      setVisibleItems(itemsPerPage);
      onFilterChange?.({ ...filterValues, [filterId]: value });
    }
  };

  const handleConfirm = () => {
    gsap.to(".grid-item", {
      scale: 0.95,
      opacity: 0,
      y: 20,
      duration: 0.3,
      stagger: 0.05,
      ease: "power3.out",
      onComplete: () => {
        setActiveFilters(filterValues);
        setVisibleItems(itemsPerPage);
        onFilterChange?.(filterValues);
        handleClose();

        gsap.to(".grid-item", {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "power3.out",
          clearProps: "all",
        });
      },
    });
  };

  const handleClear = () => {
    const defaultValues = Object.fromEntries(
      filters.map((filter) => [
        filter.id,
        checkbox ? ["all"] : filter.options[0].value,
      ])
    );

    gsap.to(".grid-item", {
      scale: 0.95,
      opacity: 0,
      y: 20,
      duration: 0.3,
      stagger: 0.05,
      ease: "power3.out",
      onComplete: () => {
        setFilterValues(defaultValues);
        setActiveFilters(defaultValues);
        setVisibleItems(itemsPerPage);
        onFilterChange?.(defaultValues);
        handleClose();

        gsap.to(".grid-item", {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "power3.out",
          clearProps: "all",
        });
      },
    });
  };

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsMobileFilterOpen(false);
    }
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsMobileFilterOpen(false);
      setIsClosing(false);
    }, 300);
  };

  return (
    <section className={`relative h-fit py-[40px] bg-white ${className}`}>
      <div className="flex flex-col gap-[40px] lg:gap-[48px] max-w-[1400px] mx-auto px-4 2xl:px-0">
        {page !== "media" && (
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="w-full px-4 py-2 border border-black  text-black font-medium rounded-full flex items-center justify-center gap-2"
            >
              <span>Filters ({filters.length})</span>
              <img
                src="/img/arrow-bottom.svg"
                alt="arrowdown"
                className={`h-6 w-6 transition-transform duration-300 ${
                  isMobileFilterOpen ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>
        )}

        <div
          className={`${page !== "media" ? "hidden lg:flex" : "flex"} gap-4`}
        >
          <div
            className={`flex w-full items-center ${
              page === "media" ? "justify-between gap-[9px]" : "gap-4"
            }`}
          >
            {filters.map((filter) => (
              <CustomSelect
                key={filter.id}
                id={filter.id}
                title={filter.title}
                options={filter.options}
                value={
                  Array.isArray(filterValues[filter.id])
                    ? filterValues[filter.id][0]
                    : filterValues[filter.id]
                }
                onChange={(value) => handleFilterChange(filter.id, value)}
                size="small"
                className={`${page === "media" ? "" : " !w-full"}`}
                checkbox={checkbox}
              />
            ))}
          </div>

          {filterButton && (
            <div className="flex gap-4 items-center">
              <button
                onClick={handleClear}
                className="px-4 py-[6px] text-black border border-transparent hover:border-black rounded-full hover:bg-transparent hover:text-black h-fit  text-base capitalize font-medium  leading-[24px]"
              >
                Clear
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-[6px] bg-black text-white rounded-full hover:opacity-90 text-base capitalize font-medium h-fit leading-[24px]"
              >
                Confirm
              </button>
            </div>
          )}
        </div>

        {isMobileFilterOpen && page !== "media" && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden"
            onClick={handleOutsideClick}
          >
            <div
              className={`absolute bottom-0 left-0 right-0 bg-white rounded-t-[20px] p-4 ${
                isClosing ? "animate-slide-down" : "animate-slide-up"
              }`}
            >
              <div className="flex justify-between items-center mb-4 text-black">
                <h3 className="text-[28px] leading-[35px] font-medium ">
                  Filters
                </h3>
                <button onClick={handleClose}>
                  <span className="text-black p-3 hover:shadow-md hover:bg-gray-100 flex items-center justify-center rounded-full ">
                    <img
                      src="/img/closeIcon.svg"
                      alt="close"
                      className="h-5 w-5"
                    />
                  </span>
                </button>
              </div>

              <div className="flex flex-col  mb-6">
                {filters.map((filter) => (
                  <CustomSelect
                    key={filter.id}
                    id={filter.id}
                    title={filter.title}
                    options={filter.options}
                    value={
                      Array.isArray(filterValues[filter.id])
                        ? filterValues[filter.id][0]
                        : filterValues[filter.id]
                    }
                    onChange={(value) => handleFilterChange(filter.id, value)}
                    className="w-full pt-4 pb-1"
                    popupMobile={true}
                    checkbox={checkbox}
                  />
                ))}
              </div>

              <div className="flex gap-3 pt-3 border-t border-borderColor">
                <button
                  onClick={() => {
                    handleClear();
                    handleClose();
                  }}
                  className="flex-1 px-4 py-2 border border-transparent hover:border-black hover:bg-transparent hover:text-black rounded-full text-base text-black font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    handleConfirm();
                    handleClose();
                  }}
                  className="flex-1 px-4 py-2 bg-black text-white   text-base font-medium rounded-full"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-[20px] gap-y-[32px]">
          {displayedItems.length > 0 ? (
            displayedItems.map((item) => (
              <div
                key={item.id}
                className="grid-item bg-gray-100 relative flex flex-col"
              >
                <div className="relative h-full">
                  <Link href={item.link} key={item.id}>
                    <div
                      className={`relative ${
                        page !== "media"
                          ? "h-[160px] lg:h-[300px]"
                          : "h-[148px] lg:h-[320px]"
                      }`}
                    >
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </Link>
                  <div className="relative w-full">
                    <div
                      className={`${
                        page !== "media"
                          ? "bg-white border border-borderColor"
                          : "bg-teamColor"
                      } p-5 lg:p-[28px] lg:pb-[48px]`}
                    >
                      <div className="flex flex-col gap-3 w-fit max-w-[554px]">
                        {item.date ? (
                          <span className="text-base font-medium text-primary leading-[22.4px] capitalize">
                            {item.category} - {item.date}
                          </span>
                        ) : item.location ? (
                          <span className="text-base font-medium text-primary  leading-[22.4px] uppercase">
                            {item.location} • {item.status}
                          </span>
                        ) : null}
                        <Link href={item.link} key={item.id} prefetch={false}>
                          <h3 className="text-[28px] lg:text-[40px] font-medium leading-[35px] lg:leading-[50px] text-black text-balance">
                            {item.title}
                          </h3>{" "}
                        </Link>

                        {item.description ? (
                          <p className="text-base lg:text-xl font-medium text-black line-clamp-2 text-pretty">
                            {item.description}
                          </p>
                        ) : null}
                        {item.location ? (
                          <Button
                            href={item.link}
                            className="px-4 lg:px-5 py-[10px] lg:py-3 bg-black rounded-[100px] h-fit text-nowrap flex items-center justify-center gap-2 !w-fit hover:opacity-80"
                            iconComponent={
                              <ArrowIcon className="rotate-180 text-white" />
                            }
                          >
                            <span className="text-white text-sm lg:text-base font-medium leading-[25px] text-start ">
                              View Project
                            </span>
                          </Button>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="grid-item col-span-1 lg:col-span-2 flex justify-center items-center flex-col py-20 gap-3">
              <h3 className="text-[40px] leading-[50px] lg:text-[64px] lg:leading-[80px]  font-medium text-black">
                There’s no projects{" "}
              </h3>
              <p className=" text-base lg:text-[28px] lg:leading-[35px] text-black font-medium">
                Try adjusting your filters to show projects.
              </p>
            </div>
          )}
        </div>

        {hasMore && (
          <div className="flex justify-center">
            <button
              onClick={() => setVisibleItems((prev) => prev + itemsPerPage)}
              className="px-8 py-3 bg-white text-black border-black border hover:bg-black hover:text-white transition-all duration-300 rounded-[100px] font-medium hover:opacity-90"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
