"use client";
import Image from "next/image";
import Breadcrumbs from "../General/Breadcrumbs";
import Button from "../General/Button";
import { useLocale } from "next-intl";
import { useEffect } from "react";
import { useState } from "react";
import { useWindowHeight } from "@/app/hooks/useWindowHeight";

interface SingleCummunitiesHeroProps {
  imageSrc: string;
  heading: string;
  subheading: string;
  imgLogo: string;
}

export default function SingleCummunitiesHero({
  imageSrc,
  heading,
  subheading,
  imgLogo,
}: SingleCummunitiesHeroProps) {
  const breadcrumbsList = [
    {
      title: "home",
      link: "/",
      pointerEvents: true,
    },
    {
      title: "Communities",
      link: "/communities",
      pointerEvents: true,
    },
    {
      title: heading,
      pointerEvents: false,
    },
  ];
  const locale = useLocale();
  const windowHeight = useWindowHeight();
  const TABLET_MIN_HEIGHT = 500;
  return (
    <section className="relative h-[60vh] md:h-[96vh] md:min-h-[711px] ">
      <div
        className="absolute h-full w-full z-[1]"
        style={{
          background: `
            linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
            linear-gradient(231.3deg, rgba(0, 0, 0, 0) 27.76%, #000000 79.21%)
          `,
        }}
      ></div>
      <div className="relative h-full w-full ">
        <Image
          src={imageSrc}
          alt="heroimage"
          fill
          className="object-cover relative z-0"
        />
      </div>
      <div
        className={`absolute inset-0  max-w-[1400px] mx-auto w-full bottom-0  mb-auto  transition-all duration-300 pt-[100px] left-0 gap-[24px] flex flex-col ${
          windowHeight >= TABLET_MIN_HEIGHT && windowHeight < 990
            ? "justify-start"
            : " justify-center"
        } items-start px-4 2xl:px-0 z-40`}
      >
        <div
          className={`flex flex-col justify-start items-start ${
            windowHeight >= TABLET_MIN_HEIGHT && windowHeight < 990
              ? "lg:gap-[20px]"
              : "lg:gap-[40px]"
          } lg:gap-[40px] gap-[24px] py-4`}
        >
          <Breadcrumbs list={breadcrumbsList} color="text-white" />
          <Image
            src={imgLogo}
            alt="heroimage"
            width={80}
            height={80}
            className="object-cover relative z-0 h-[80px] w-[80px]"
          />
          <div className="flex flex-col gap-3 max-w-[500px] w-fit">
            <h1 className="text-xl lg:text-[64px] lg:leading-[80px] font-medium text-white tracking-[0.5%]">
              {heading}
            </h1>
            <h2 className=" text-sm lg:text-base font-normal text-white">
              {subheading}
            </h2>
          </div>
          <div className="flex  gap-3">
            <Button
              href={`/${locale}`}
              className="px-5 py-3 bg-white text-black border border-transparent hover:bg-transparent hover:text-white hover:border hover:border-white transition-all duration-300 rounded-[100px] h-fit text-nowrap flex items-center justify-center gap-2 !w-fit"
            >
              <span className="text-inherit text-sm lg:text-base font-medium leading-[25px] text-start">
                Download Brochure
              </span>
            </Button>{" "}
            <Button
              href={`/${locale}`}
              className="px-5 py-3 bg-transparent border border-white hover:bg-black/70 transition-all duration-300 rounded-[100px] h-fit text-nowrap flex items-center justify-center gap-2 !w-fit"
            >
              <span className="text-white text-sm lg:text-base font-medium leading-[25px] text-start">
                Inquire Now
              </span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
