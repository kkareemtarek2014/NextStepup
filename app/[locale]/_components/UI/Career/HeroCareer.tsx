"use client";
import Image from "next/image";
import ArrowDownIcon from "../../Icons/ArrowDownIcon";

export default function HomeHero() {
  return (
    <section className="relative h-[354px] md:h-[35vh]  lg:min-h-[438px] ">
      <div className="relative h-full w-full bg-teamColor "></div>
      <div className="absolute w-full z-[2] flex flex-col bottom-0 left-0 text-white gap-[24px] pb-[60px] ">
        <div className="max-w-[1400px] mx-auto w-full gap-[24px] flex flex-col justify-start items-start px-4 lg:px-0">
          <div className="flex flex-col justify-start items-start gap-[24px]  ">
            <h1 className="md:text-[120px] text-[42px] leading-[52.8px] md:leading-[150px] font-medium text-black">
              Careers{" "}
            </h1>{" "}
            <h2 className="md:text-base  md:leading-[22.4px] font-semimedium text-black max-w-[600px] ">
              Our team is a dynamic blend of industry experts, visionaries, and
              dedicated professionals committed to transforming real estate and
              enhancing lives.
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}
