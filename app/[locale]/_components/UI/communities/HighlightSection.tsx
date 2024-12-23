"use client";

import Image from "next/image";
import React, { JSX } from "react";

interface HighlightItem {
  number: string;
  description: string;
}

interface HighlightCardProps {
  item: HighlightItem;
}

const HIGHLIGHT_ITEMS: HighlightItem[] = [
  {
    number: "10",
    description: "Minutes walk from The Dubai Mall Metro Station",
  },
  {
    number: "2",
    description: "Kilometers aways from Ras El Hekma Downtown",
  },
  {
    number: "4",
    description: "Kilometers to the open beach",
  },
  {
    number: "5",
    description: "Kilometers from Marassi",
  },
  {
    number: "20",
    description: "Kilometers away from Al Alamein Towers",
  },
];

const HighlightCard: React.FC<HighlightCardProps> = ({ item }) => (
  <div className="flex flex-col gap-3 w-full max-w-[268px]">
    <h3 className=" text-[40px] lg:text-[60px]  font-medium text-newRed">
      {item.number}
    </h3>
    <p className="text-pretty text-sm lg:text-base font-semimedium text-black leading-[22.4px]">
      {item.description}
    </p>
  </div>
);

export default function HighlightSection(): JSX.Element {
  return (
    <section className="bg-teamColor">
      <div className="max-w-[1512px] mx-auto flex flex-col lg:flex-row h-fit">
        <div className="w-full lg:w-1/2  lg:m-5 h-[343px] lg:h-[800px] relative">
          <Image
            src="/img/highlight1.png"
            alt="Location highlight"
            fill
            className="object-cover w-full h-full  p-4 lg:p-0"
            priority
          />
        </div>

        <div className="w-full lg:w-1/2 flex  justify-center items-center py-[40px] 2xl:py-0 px-4 xl:px-0">
          <div className="flex flex-col justify-center items-center gap-20 max-w-[556px] w-full">
            <header className="flex flex-col justify-center items-start gap-3 w-fit">
              <span className="text-xs tracking-[0.2em] uppercase text-black">
                Location Highlights
              </span>
              <h2 className="text-pretty text-[28px] lg:text-[40px] font-medium text-black leading-[35px] lg:leading-[50px]">
                Convenience and connections on your doorstep
              </h2>
            </header>

            <div className="grid grid-cols-2 gap-5 w-full">
              {HIGHLIGHT_ITEMS.map((item, index) => (
                <HighlightCard key={index} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
