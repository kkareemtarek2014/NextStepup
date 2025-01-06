"use client";

import { useFadeInUp } from "@/app/[locale]/utils/animations/useFadeInUp";
import NumberCounter from "../General/NumberCounter";

interface CountItem {
  id: number;
  Title: string;
  SubTitle: string;
}

interface ProjectCountData {
  TitleCurrent: string;
  TitleUpcomming: string;
  CountSection: CountItem[];
  CountSection2: CountItem[];
}

export default function StatSection({ data }: { data: ProjectCountData }) {
  useFadeInUp({
    elementIds: ["current-title", "upcoming-title"],
    delay: 0,
    stagger: 0.2,
    fromY: 30,
    duration: 0.8,
  });
  return (
    <section className="relative h-fit bg-borderColor">
      <div className="flex relative py-[40px] lg:py-[80px] max-w-[1400px] mx-auto">
        <div className="flex flex-col lg:flex-row w-full mx-4 lg:mx-0 gap-[40px] lg:gap-0">
          <div className="border-t border-primary w-full lg:w-[48.5%]">
            <div className="flex flex-col pt-[20px] lg:p-[40px] gap-6">
              <h3
                id="current-title"
                className="text-sm font-medium text-black tracking-wider uppercase "
              >
                {data.TitleCurrent}
              </h3>
              <div className="flex justify-between items-center gap-[10px]">
                {data.CountSection.map((item, index) => (
                  <NumberCounter
                    key={item.id}
                    id={`current-stat-${item.id}`}
                    value={item.Title}
                    title={item.SubTitle}
                    showK={index > 0}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="w-[1px] bg-primary h-[80%] hidden lg:block self-center mx-[20px]" />

          <div className="border-t border-primary w-full lg:w-[48.5%]">
            <div className="flex flex-col pt-[20px] lg:p-[40px] gap-6">
              <h3
                id="upcoming-title"
                className="text-sm font-medium text-black tracking-wider uppercase"
              >
                {data.TitleUpcomming}
              </h3>
              <div className="flex justify-between items-center">
                {data.CountSection2.map((item, index) => (
                  <NumberCounter
                    key={item.id}
                    id={`upcoming-stat-${item.id}`}
                    value={item.Title}
                    title={item.SubTitle}
                    showK={index > 0}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
