"use client";
import { useState, useRef, useEffect } from "react";
import { Range, getTrackBackground } from "react-range";
import Image from "next/image";
import PropertyDetailsPopup from "./PropertyDetailsPopup";
import { motion, useInView, AnimatePresence } from "framer-motion";

export interface MapMarker {
  id: string | number;
  Title: string;
  X_axis: number;
  Y_Axis: number;
  mobileX: number;
  mobileY: number;
  name: string;
  Description: string;
  price: number;
  fromArea: number;
  toArea: number;
  fromBedrooms: number;
  toBedrooms: number;
  fromBathrooms: number;
  toBathrooms: number;
  paymentPlan: string;
  deliveryDate: string;
  downloadButton: {
    ButtonTitle: string;
    ButtonLink: string;
  };
  Image: {
    url: string;
    formats: {
      small: {
        url: string;
      };
      thumbnail: {
        url: string;
      };
    };
  };
}

interface ImagePropertyMapProps {
  markers: MapMarker[];
  mapImage: string;
  mapImageMobile: string;
  data: any;
  isEditMode?: boolean;
}

interface FilterState {
  selectedTitles: Set<string>;
  priceRange: {
    min: number;
    max: number;
  };
}

interface SelectedProperty {
  marker: MapMarker | null;
  position: { x: number; y: number } | null;
}

const CheckedIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="20" height="20" rx="4" fill="black" />
    <path
      d="M14.6668 6.5L8.25016 12.9167L5.3335 10"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const UnCheckedIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="0.5" y="0.5" width="19" height="19" rx="3.5" stroke="#D1D5DB" />
  </svg>
);

export default function ImagePropertyMap({
  markers,
  mapImage,
  mapImageMobile,
  data,
  isEditMode = true,
}: ImagePropertyMapProps) {
  const [clickedPosition, setClickedPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [activeMarkers, setActiveMarkers] = useState<Set<string | number>>(
    new Set()
  );
  const [filters, setFilters] = useState<FilterState>({
    selectedTitles: new Set(),
    priceRange: {
      min: 0,
      max: Math.max(...markers.map((marker) => marker.price)),
    },
  });
  console.log("Map Image:", mapImage);
  console.log("Map Image Mobile:", mapImageMobile);
  const [openDropdown, setOpenDropdown] = useState<Set<"property" | "price">>(
    new Set(["property"])
  );

  const [values, setValues] = useState([
    0,
    Math.max(...markers.map((marker) => marker.price)),
  ]);

  const [selectedProperty, setSelectedProperty] = useState<SelectedProperty>({
    marker: null,
    position: null,
  });

  const [isMainDropdownOpen, setIsMainDropdownOpen] = useState(false);

  const [isMobile, setIsMobile] = useState(false);

  const filterContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterContainerRef.current &&
        !filterContainerRef.current.contains(event.target as Node) &&
        window.innerWidth <= 768
      ) {
        setIsMainDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const uniqueTitles = Array.from(
    new Set(markers.map((marker) => marker.Title))
  );

  const filteredMarkers = markers.filter((marker) => {
    const titleMatch =
      filters.selectedTitles.size === 0 ||
      filters.selectedTitles.has(marker.Title);
    const priceMatch =
      marker.price >= filters.priceRange.min &&
      marker.price <= filters.priceRange.max;
    return titleMatch && priceMatch;
  });

  const handleTitleFilter = (title: string) => {
    setFilters((prev) => {
      const newTitles = new Set(prev.selectedTitles);
      if (newTitles.has(title)) {
        newTitles.delete(title);
      } else {
        newTitles.add(title);
      }
      return { ...prev, selectedTitles: newTitles };
    });
  };

  const handlePriceRangeChange = (min: number, max: number) => {
    const validMin = Math.min(min, max);
    const validMax = Math.max(min, max);

    setFilters((prev) => ({
      ...prev,
      priceRange: { min: validMin, max: validMax },
    }));
  };

  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isEditMode) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setClickedPosition({ x: Number(x.toFixed(2)), y: Number(y.toFixed(2)) });

    navigator.clipboard.writeText(`x: ${x.toFixed(2)}, y: ${y.toFixed(2)}`);
  };

  const handleMarkerClick = (marker: MapMarker, e: React.MouseEvent) => {
    e.stopPropagation();

    if (selectedProperty.marker?.id === marker.id) {
      setSelectedProperty({ marker: null, position: null });
      setActiveMarkers(new Set());
      return;
    }

    setActiveMarkers(new Set([marker.id]));
    setSelectedProperty({
      marker,
      position: { x: e.clientX, y: e.clientY },
    });
  };

  const handleOutsideClick = (e: React.MouseEvent) => {
    const isFilterClick = (e.target as Element).closest(".filter-controls");
    const isPopupClick = (e.target as Element).closest(
      ".property-details-popup"
    );

    if (!isFilterClick && !isPopupClick) {
      setSelectedProperty({ marker: null, position: null });
    }
  };

  const toggleDropdown = (type: "property" | "price") => {
    setOpenDropdown((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(type)) {
        newSet.delete(type);
      } else {
        newSet.add(type);
      }
      return newSet;
    });
  };

  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  return (
    <div
      className="relative w-full"
      onClick={handleOutsideClick}
      ref={containerRef}
    >
      <AnimatePresence>
        {isMainDropdownOpen && (
          <motion.div
            ref={filterContainerRef}
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-0 left-0 bg-transparent right-0 z-50 overflow-hidden"
            style={{
              maxHeight: "80vh",
            }}
          >
            <div className="p-4  bg-white rounded-b-[30px] shadow-md relative">
              <button
                onClick={() => setIsMainDropdownOpen(false)}
                className="absolute top-[1.5vh] right-[2vh] p-3 rounded-full bg-white shadow-md"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 6L6 18M6 6L18 18"
                    stroke="#000000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <div className="pb-4">
                <h3 className="text-[2vh] font-medium pb-2 text-black">
                  Property Types
                </h3>
                <div className="space-y-[1.2vh]">
                  {uniqueTitles.map((title) => (
                    <label
                      key={title}
                      className="flex items-center space-x-[1vh] cursor-pointer"
                    >
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={filters.selectedTitles.has(title)}
                          onChange={() => handleTitleFilter(title)}
                          className="hidden peer"
                        />
                        <motion.span
                          initial={false}
                          animate={{
                            scale: filters.selectedTitles.has(title)
                              ? [1, 1.2, 1]
                              : 1,
                            rotate: filters.selectedTitles.has(title)
                              ? [0, 10, 0]
                              : 0,
                          }}
                          transition={{
                            duration: 0.3,
                            type: "spring",
                            stiffness: 200,
                          }}
                          className="hidden peer-checked:block"
                        >
                          <CheckedIcon />
                        </motion.span>
                        <motion.span
                          initial={false}
                          animate={{
                            scale: !filters.selectedTitles.has(title)
                              ? [1, 0.8, 1]
                              : 1,
                          }}
                          transition={{
                            duration: 0.2,
                          }}
                          className="block peer-checked:hidden"
                        >
                          <UnCheckedIcon />
                        </motion.span>
                      </div>
                      <motion.span
                        initial={false}
                        animate={{
                          color: filters.selectedTitles.has(title)
                            ? "#000000"
                            : "#4B5563",
                          scale: filters.selectedTitles.has(title)
                            ? [1, 1.05, 1]
                            : 1,
                        }}
                        transition={{ duration: 0.2 }}
                        className="text-[1.6vh] font-medium"
                      >
                        {title}
                      </motion.span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-[1.5vh]pt-[1.5vh] border-t py-4">
                <h3 className="text-[2vh] font-medium pb-2 text-black">
                  Price Range
                </h3>
                <div className="space-y-[2vh]">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-[1.4vh] text-black">From</span>
                      <span className="block text-[1.6vh] font-medium text-black">
                        {values[0].toLocaleString()} EGP
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[1.4vh] text-black">To</span>
                      <span className="block text-[1.6vh] font-medium text-black">
                        {values[1].toLocaleString()} EGP
                      </span>
                    </div>
                  </div>

                  <div className="py-4 px-1">
                    <Range
                      values={values}
                      step={100000}
                      min={0}
                      max={Math.max(...markers.map((marker) => marker.price))}
                      onChange={(newValues) => {
                        setValues(newValues);
                        handlePriceRangeChange(newValues[0], newValues[1]);
                      }}
                      renderTrack={({ props, children }) => (
                        <div
                          className="h-2 w-full"
                          style={{
                            ...props.style,
                          }}
                        >
                          <div
                            ref={props.ref}
                            className="h-2 w-full rounded-full"
                            style={{
                              background: getTrackBackground({
                                values,
                                colors: ["#E5E7EB", "#000000", "#E5E7EB"],
                                min: 0,
                                max: Math.max(
                                  ...markers.map((marker) => marker.price)
                                ),
                              }),
                            }}
                          >
                            {children}
                          </div>
                        </div>
                      )}
                      renderThumb={({ props }) => (
                        <div
                          {...props}
                          className="h-4 w-4 rounded-full bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                          style={{
                            ...props.style,
                            boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.12)",
                          }}
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        className="flex flex-row lg:items-start justify-between lg:flex-col items-center  w-full lg:w-fit p-4 lg:p-0 absolute lg:top-[47px] lg:left-[56px] lg:right-[56px] z-20"
        initial={{ opacity: 0, x: -50 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <motion.h2
          className=" text-[28px] leading-[35px] lg:text-[40px] lg:leading-[50px] text-white font-medium md:mb-6 lg:mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          Masterplan
        </motion.h2>

        <motion.div
          className="relative w-[348px] bg-white shadow-lg z-10 filter-controls hidden lg:block"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <div className="border-b border-gray-200">
            <button
              className="w-full px-5 py-4 flex items-center justify-between"
              onClick={() => toggleDropdown("property")}
            >
              <span className="text-[28px] leading-[35px] text-black font-medium">
                Filters
              </span>
              <motion.svg
                animate={{ rotate: openDropdown.has("property") ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="w-5 h-5 text-black"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </motion.svg>
            </button>

            <AnimatePresence>
              {openDropdown.has("property") && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-4 space-y-2">
                    {uniqueTitles.map((title) => (
                      <label
                        key={title}
                        className="flex items-center space-x-3 cursor-pointer"
                      >
                        <div className="relative">
                          <input
                            type="checkbox"
                            checked={filters.selectedTitles.has(title)}
                            onChange={() => handleTitleFilter(title)}
                            className="hidden peer"
                          />
                          <motion.span
                            initial={false}
                            animate={{
                              scale: filters.selectedTitles.has(title)
                                ? [1, 1.2, 1]
                                : 1,
                              rotate: filters.selectedTitles.has(title)
                                ? [0, 10, 0]
                                : 0,
                            }}
                            transition={{
                              duration: 0.3,
                              type: "spring",
                              stiffness: 200,
                            }}
                            className="hidden peer-checked:block"
                          >
                            <CheckedIcon />
                          </motion.span>
                          <motion.span
                            initial={false}
                            animate={{
                              scale: !filters.selectedTitles.has(title)
                                ? [1, 0.8, 1]
                                : 1,
                            }}
                            transition={{
                              duration: 0.2,
                            }}
                            className="block peer-checked:hidden"
                          >
                            <UnCheckedIcon />
                          </motion.span>
                        </div>
                        <motion.span
                          initial={false}
                          animate={{
                            color: filters.selectedTitles.has(title)
                              ? "#000000"
                              : "#4B5563",
                            scale: filters.selectedTitles.has(title)
                              ? [1, 1.05, 1]
                              : 1,
                          }}
                          transition={{ duration: 0.2 }}
                          className="text-base font-semimedium text-black"
                        >
                          {title}
                        </motion.span>
                      </label>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div>
            <button
              className="w-full px-5 py-4 flex items-center justify-between"
              onClick={() => toggleDropdown("price")}
            >
              <span className="text-[28px] leading-[35px] font-medium text-black">
                Price
              </span>
              <motion.svg
                animate={{ rotate: openDropdown.has("price") ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="w-5 h-5 text-black"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </motion.svg>
            </button>

            <AnimatePresence>
              {openDropdown.has("price") && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-6 space-y-6">
                    <div className="flex justify-between items-center">
                      <div className="space-y-1">
                        <span className="text-xs text-gray-500">From</span>
                        <span className="block text-sm font-medium text-black">
                          {values[0].toLocaleString()} EGP
                        </span>
                      </div>
                      <div className="space-y-1 text-right">
                        <span className="text-xs text-gray-500">To</span>
                        <span className="block text-sm font-medium text-black">
                          {values[1].toLocaleString()} EGP
                        </span>
                      </div>
                    </div>

                    <div className="py-4">
                      <Range
                        values={values}
                        step={100000}
                        min={0}
                        max={Math.max(...markers.map((marker) => marker.price))}
                        onChange={(newValues) => {
                          setValues(newValues);
                          handlePriceRangeChange(newValues[0], newValues[1]);
                        }}
                        renderTrack={({ props, children }) => (
                          <div
                            className="h-2 w-full"
                            style={{
                              ...props.style,
                            }}
                          >
                            <div
                              ref={props.ref}
                              className="h-2 w-full rounded-full"
                              style={{
                                background: getTrackBackground({
                                  values,
                                  colors: ["#E5E7EB", "#000000", "#E5E7EB"],
                                  min: 0,
                                  max: Math.max(
                                    ...markers.map((marker) => marker.price)
                                  ),
                                }),
                              }}
                            >
                              {children}
                            </div>
                          </div>
                        )}
                        renderThumb={({ props }) => (
                          <div
                            {...props}
                            className="h-4 w-4 rounded-full bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                            style={{
                              ...props.style,
                              boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.12)",
                            }}
                          />
                        )}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        <div className=" relative block lg:hidden">
          <motion.button
            className="flex items-center gap-2 px-5 py-3 bg-white rounded-[100px] shadow-lg relative text-black z-[999999]"
            onClick={() => setIsMainDropdownOpen(!isMainDropdownOpen)}
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <span className="text-base text-black font-medium">Filters</span>
            <motion.svg
              animate={{ rotate: isMainDropdownOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </motion.svg>
          </motion.button>
        </div>
      </motion.div>

      <motion.div
        className="relative w-full max-w-[1512px] aspect-[375/640] lg:aspect-[1512/900] mx-auto overflow-hidden bg-gray-100"
        onClick={handleImageClick}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={
          isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }
        }
        transition={{ duration: 0.8 }}
      >
        <Image
          src={isMobile ? "/img/MobileMap.svg" : "/img/property-map.png"}
          alt="Property Map"
          className="object-cover object-left lg:object-cover lg:object-center"
          fill
        />

        {markers.map((marker, index) => {
          const isVisible = filteredMarkers.some((m) => m.id === marker.id);

          return (
            <motion.div
              key={marker.id}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer ${
                selectedProperty?.marker?.id === marker.id ? "z-50" : "z-40"
              }`}
              style={{
                left: `${isMobile ? marker.mobileX : marker.X_axis}%`,
                top: `${isMobile ? marker.mobileY : marker.Y_Axis}%`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={
                isInView
                  ? isVisible
                    ? { opacity: 1, scale: 1, display: "block" }
                    : {
                        opacity: 0,
                        scale: 0,
                        transitionEnd: { display: "none" },
                      }
                  : { opacity: 0, scale: 0 }
              }
              transition={{
                delay: isVisible ? 0.4 + index * 0.1 : 0,
                duration: 0.3,
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
            >
              <button
                className="relative"
                onClick={(e) => handleMarkerClick(marker, e)}
              >
                <motion.img
                  src={
                    activeMarkers.has(marker.id)
                      ? "/img/Excludeyellow.svg"
                      : "/img/Exclude.svg"
                  }
                  alt="Marker"
                  className="w-[20.34px] h-[24.28px] lg:w-[33.51px] lg:h-[40px]"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                />
                <span
                  className={`absolute top-full left-1/2 -translate-x-1/2 mt-1 lg:mt-2 
                             whitespace-nowrap font-medium capitalize px-3 lg:py-1.5 
                             text-[12.14px] lg:text-[20px] leading-[15px] lg:leading-[25px] rounded z-10 ${
                               activeMarkers.has(marker.id)
                                 ? "text-[#FAC63E]"
                                 : "text-white"
                             }`}
                >
                  {marker.Title}
                </span>
              </button>
            </motion.div>
          );
        })}

        {isEditMode && clickedPosition && (
          <div
            className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{
              left: `${clickedPosition.x}%`,
              top: `${clickedPosition.y}%`,
            }}
          >
            <div className="p-2 bg-red-500 rounded-full animate-pulse">
              <div className="w-3 h-3 bg-white rounded-full" />
            </div>
          </div>
        )}

        {selectedProperty.marker && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <PropertyDetailsPopup
              marker={selectedProperty.marker}
              onClose={() =>
                setSelectedProperty({ marker: null, position: null })
              }
            />
          </motion.div>
        )}
      </motion.div>

      {isEditMode && (
        <div className="fixed bottom-4 right-4 bg-black/90 text-white p-4 rounded-lg shadow-lg z-50">
          <h3 className="font-bold mb-2">Coordinate Finder</h3>
          {clickedPosition ? (
            <div>
              <p>X: {clickedPosition.x}%</p>
              <p>Y: {clickedPosition.y}%</p>
              <p className="text-xs mt-2 text-gray-300">
                Coordinates copied to clipboard!
              </p>
            </div>
          ) : (
            <div>
              <p>Click anywhere on the map to get coordinates</p>
              <p className="text-xs mt-2 text-gray-300">
                This shows on Development Mode
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
