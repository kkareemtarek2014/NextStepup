"use client";

import Image from "next/image";
import React, { JSX } from "react";

interface HighlightItem {
  id: number;
  Number: string;
  Description: string;
}

interface ImageFormat {
  url: string;
  width: number;
  height: number;
}

interface ImageData {
  url: string;
  alternativeText: string | null;
  formats?: {
    large?: ImageFormat;
    medium?: ImageFormat;
    small?: ImageFormat;
  };
}

interface HighlightSectionData {
  id: number;
  SubTitle: string;
  Title: string;
  Image: ImageData;
  HighlightRepeater: HighlightItem[];
}

// Fallback static data
const STATIC_HIGHLIGHT_ITEMS = [
  {
    id: 1,
    Number: "10",
    Description: "Minutes walk from The Dubai Mall Metro Station",
  },
  {
    id: 2,
    Number: "2",
    Description: "Kilometers aways from Ras El Hekma Downtown",
  },
  {
    id: 3,
    Number: "4",
    Description: "Kilometers to the open beach",
  },
  {
    id: 4,
    Number: "5",
    Description: "Kilometers from Marassi",
  },
  {
    id: 5,
    Number: "20",
    Description: "Kilometers away from Al Alamein Towers",
  },
];

interface HighlightCardProps {
  item: HighlightItem;
}

const HighlightCard: React.FC<HighlightCardProps> = ({ item }) => (
  <div className="flex flex-col gap-3 w-full max-w-[268px]">
    <h3 className="text-[40px] lg:text-[60px] font-medium text-newRed">
      {item.Number}
    </h3>
    <p className="text-pretty text-sm lg:text-base font-semimedium text-black leading-[22.4px]">
      {item.Description}
    </p>
  </div>
);

interface Props {
  highlightData?: HighlightSectionData;
}

export default function HighlightSection({
  highlightData,
}: Props): JSX.Element {
  return (
    <section className="bg-teamColor">
      <div className="max-w-[1512px] mx-auto flex flex-col lg:flex-row h-fit">
        <div className="w-full lg:w-1/2 lg:m-5 h-[343px] lg:h-[800px] relative">
          <Image
            src={
              highlightData?.Image
                ? `${process.env.NEXT_PUBLIC_IMAGES_DOMAIN}${highlightData.Image.url}`
                : "/img/highlight1.png"
            }
            alt="Location highlight"
            fill
            className="object-cover w-full h-full p-4 lg:p-0"
            priority
          />
        </div>

        <div className="w-full lg:w-1/2 flex justify-center items-center py-[40px] 2xl:py-0 px-4 xl:px-0">
          <div className="flex flex-col justify-center items-center gap-20 max-w-[556px] w-full">
            <header className="flex flex-col justify-center items-start gap-3 w-fit">
              <span className="text-xs tracking-[0.2em] uppercase text-black">
                {highlightData?.SubTitle || "Location Highlights"}
              </span>
              <h2 className="text-pretty text-[28px] lg:text-[40px] font-medium text-black leading-[35px] lg:leading-[50px]">
                {highlightData?.Title ||
                  "Convenience and connections on your doorstep"}
              </h2>
            </header>

            <div className="grid grid-cols-2 gap-5 w-full">
              {(highlightData?.HighlightRepeater || STATIC_HIGHLIGHT_ITEMS).map(
                (item) => (
                  <HighlightCard key={item.id} item={item} />
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
