"use client";
import Image from "next/image";

export default function HomeHero() {
  return (
    <section className="relative h-[60vh] md:h-[71vh] ">
      <div className="absolute h-full w-full bg-black/20 z-[1]"></div>
      <div className="relative h-full w-full ">
        <Image
          src="/img/aboutHero.png"
          alt="heroimage"
          fill
          className="object-cover relative z-0"
        />
      </div>
      <div className="absolute w-full z-[2] flex flex-col bottom-0 left-0 text-white gap-[24px] pb-[100px] ">
        <div className="max-w-[1400px] mx-auto w-full gap-[24px] flex flex-col justify-start items-start px-4 2xl:px-0">
          <div className="flex flex-col justify-start items-start  ">
            <h1 className="md:text-[64px] lg:text-[120px] lg:leading-[150px] text-[42px] leading-[52.8px] md:leading-[80px] font-normal text-white ">
              About us{" "}
            </h1>{" "}
            <h2 className="md:text-[21px] text-2xl lg:text-[28px] leading-[30px] lg:leading-[36px] font-normal w-fit text-white lg:text-balance break-words">
              Real Estate developer blending timeless <br /> design with
              comfortable living.
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}
