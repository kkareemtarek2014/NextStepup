"use client";
import { useState } from "react";
import { Range, getTrackBackground } from "react-range";

interface MapMarker {
  id: string;
  title: string;
  x: number;
  y: number;
  name: string;
  isActive?: boolean;
  description: string;
  price: number;
}

interface ImagePropertyMapProps {
  markers: MapMarker[];
  mapImage: string;
  isEditMode?: boolean;
}

interface FilterState {
  selectedTitles: Set<string>;
  priceRange: {
    min: number;
    max: number;
  };
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

const ImagePropertyMap: React.FC<ImagePropertyMapProps> = ({
  isEditMode = false,
}) => {
  const [clickedPosition, setClickedPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [activeMarkers, setActiveMarkers] = useState<Set<string>>(new Set());
  const [filters, setFilters] = useState<FilterState>({
    selectedTitles: new Set(),
    priceRange: {
      min: 0,
      max: 2000000,
    },
  });

  const [openDropdown, setOpenDropdown] = useState<Set<"property" | "price">>(
    new Set(["property"])
  );

  const [values, setValues] = useState([0, 2000000]);

  const staticMarkers = [
    {
      id: "1",
      title: "Apartment",
      x: 25.17,
      y: 66.99,
      name: "Pool Front Twinhouse",
      description:
        "Our third row Pool Deck Chalets sit 100 meters away from the beach.",
      fromArea: 69,
      toArea: 147,
      fromBedrooms: 2,
      toBedrooms: 4,
      fromBathrooms: 2,
      toBathrooms: 3,
      price: 1000000,
      paymentPlan: "8 years",
      deliveryDate: "01/2025",
    },
    {
      id: "2",
      title: "Townhouse",
      x: 49.17,
      y: 67.32,
      name: "Pool Front Twinhouse",
      description:
        "Our third row Pool Deck Chalets sit 100 meters away from the beach.",
      fromArea: 69,
      toArea: 147,
      fromBedrooms: 2,
      toBedrooms: 4,
      fromBathrooms: 2,
      toBathrooms: 3,
      price: 1000000,
      paymentPlan: "8 years",
      deliveryDate: "01/2025",
    },
    {
      id: "3",
      title: "Twin House",
      x: 41.7,
      y: 53.99,
      name: "Pool Front Twinhouse",
      description:
        "Our third row Pool Deck Chalets sit 100 meters away from the beach.",
      fromArea: 69,
      toArea: 147,
      fromBedrooms: 2,
      toBedrooms: 4,
      fromBathrooms: 2,
      toBathrooms: 3,
      price: 3000000,
      paymentPlan: "8 years",
      deliveryDate: "01/2025",
    },
    {
      id: "4",
      title: "Apartment",
      x: 30.72,
      y: 50.44,
      name: "Pool Front Twinhouse",
      description:
        "Our third row Pool Deck Chalets sit 100 meters away from the beach.",
      fromArea: 69,
      toArea: 147,
      fromBedrooms: 2,
      toBedrooms: 4,
      fromBathrooms: 2,
      toBathrooms: 3,
      price: 1000000,
      paymentPlan: "8 years",
      deliveryDate: "01/2025",
    },
    {
      id: "5",
      title: "Duplex",
      x: 42.82,
      y: 37.77,
      name: "Pool Front Twinhouse",
      description:
        "Our third row Pool Deck Chalets sit 100 meters away from the beach.",
      fromArea: 69,
      toArea: 147,
      fromBedrooms: 2,
      toBedrooms: 4,
      fromBathrooms: 2,
      toBathrooms: 3,
      price: 2000000,
      paymentPlan: "8 years",
      deliveryDate: "01/2025",
    },
    {
      id: "6",
      title: "Duplex",
      x: 30.39,
      y: 36.1,
      name: "Pool Front Twinhouse",
      description:
        "Our third row Pool Deck Chalets sit 100 meters away from the beach.",
      fromArea: 69,
      toArea: 147,
      fromBedrooms: 2,
      toBedrooms: 4,
      fromBathrooms: 2,
      toBathrooms: 3,
      price: 1000000,
      paymentPlan: "8 years",
      deliveryDate: "01/2025",
    },
  ];

  const uniqueTitles = Array.from(
    new Set(staticMarkers.map((marker) => marker.title))
  );

  const filteredMarkers = staticMarkers.filter((marker) => {
    const titleMatch =
      filters.selectedTitles.size === 0 ||
      filters.selectedTitles.has(marker.title);
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

  const handleMarkerClick = (markerId: string) => {
    setActiveMarkers((prev) => {
      const newActive = new Set(prev);
      if (newActive.has(markerId)) {
        newActive.delete(markerId);
      } else {
        newActive.add(markerId);
      }
      return newActive;
    });
  };

  // const priceRanges = [
  //   { min: 0, max: 500000, label: "Up to $500,000" },
  //   { min: 500000, max: 1000000, label: "$500,000 - $1,000,000" },
  //   { min: 1000000, max: 1500000, label: "$1,000,000 - $1,500,000" },
  //   { min: 1500000, max: 2000000, label: "$1,500,000 - $2,000,000" },
  //   { min: 0, max: 2000000, label: "All Prices" },
  // ];

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

  return (
    <div className="relative">
      <div className="flex flex-col gap-[19px] absolute top-[47px] left-[56px]">
        <h2 className="relative text-[40px] leading-[50px] text-white z-10 font-medium">
          Masterplan
        </h2>
        <div className="relative w-[348px] bg-white shadow-lg z-10">
          <div className="border-b border-gray-200">
            <button
              className="w-full px-5 py-4 flex items-center justify-between"
              onClick={() => toggleDropdown("property")}
            >
              <span className="text-[28px] leading-[35px] text-black font-medium">
                Filters
              </span>
              <svg
                className={`w-5 h-5 transition-transform text-black ${
                  openDropdown.has("property") ? "rotate-180" : ""
                }`}
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
              </svg>
            </button>

            {openDropdown.has("property") && (
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
                      <span className="hidden peer-checked:block">
                        <CheckedIcon />
                      </span>
                      <span className="block peer-checked:hidden">
                        <UnCheckedIcon />
                      </span>
                    </div>
                    <span className="text-base font-semimedium text-black">
                      {title}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>

          <div className="">
            <button
              className="w-full px-5 py-4 flex items-center justify-between"
              onClick={() => toggleDropdown("price")}
            >
              <span className="text-[28px] leading-[35px] font-medium text-black">
                Price
              </span>
              <svg
                className={`w-5 h-5 transition-transform text-black ${
                  openDropdown.has("price") ? "rotate-180" : ""
                }`}
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
              </svg>
            </button>

            {openDropdown.has("price") && (
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
                    max={2000000}
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
                              max: 2000000,
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
            )}
          </div>
        </div>
      </div>
      <div
        className="relative w-full h-[900px] max-w-[1512px] mx-auto overflow-hidden bg-gray-100"
        onClick={handleImageClick}
      >
        <img
          src="/img/property-map.png"
          alt="Property Map"
          className="w-full h-full object-cover"
        />

        {filteredMarkers.map((marker) => (
          <div
            key={marker.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${marker.x}%`,
              top: `${marker.y}%`,
            }}
          >
            <button
              className="relative"
              onClick={() => handleMarkerClick(marker.id)}
            >
              <img
                src={
                  activeMarkers.has(marker.id)
                    ? "/img/Excludeyellow.svg"
                    : "/img/Exclude.svg"
                }
                alt="Marker"
                className="w-[33.51px] h-[40px] hover:scale-110 transition-transform duration-300"
              />
              <span
                className={`absolute top-full left-1/2 -translate-x-1/2 mt- 2 
                           whitespace-nowrap  font-medium capitalize  px-3 py-1.5 
                           text-[20px] leading-[25px] rounded z-10 ${
                             activeMarkers.has(marker.id)
                               ? "text-[#FAC63E]"
                               : "text-white"
                           }`}
              >
                {marker.title}
              </span>
            </button>
          </div>
        ))}

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
      </div>

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
            <p>Click anywhere on the map to get coordinates</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ImagePropertyMap;
