"use client";
import Image from "next/image";
import ArrowDownIcon from "../../Icons/ArrowDownIcon";

export default function HomeHero() {
  return (
    <section className="relative h-[80vh] md:h-[90vh] ">
      <div className="absolute h-full w-full bg-black/20 z-[1]"></div>
      <div className="relative h-full w-full ">
        <Image
          src="/img/homeHero.webp"
          alt="heroimage"
          fill
          className="object-cover relative z-0"
        />
      </div>
      <div className="absolute w-full z-[2] flex flex-col bottom-0 left-0 text-white gap-[24px] pb-[100px] ">
        <div className="max-w-[1400px] mx-auto w-full gap-[24px] flex flex-col justify-start items-start px-4 2xl:px-0">
          <div className="flex flex-col justify-start items-start  ">
            <h1 className="md:text-[64px] text-[42px] leading-[52.8px] md:leading-[80px] font-normal ">
              Real Estate developer blending{" "}
            </h1>{" "}
            <h2 className="md:text-[64px] text-[42px] leading-[52.8px] md:leading-[80px] font-normal ">
              timeless design with comfortable living.{" "}
            </h2>
          </div>
          <div className="flex gap-[10px]">
            <h4>Scroll to explore</h4>
            <ArrowDownIcon className="w-[32px] h-[32px]" />
          </div>{" "}
        </div>
      </div>
    </section>
  );
}
