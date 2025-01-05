"use client";
import Image from "next/image";
import ArrowDownIcon from "../../Icons/ArrowDownIcon";
import { useEffect, useState } from "react";
import { useTextAnimation } from "@/app/[locale]/utils/textanimation";

export default function HomeHero({ data }: { data: any }) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const updateMedia = () => setIsMobile(window.innerWidth <= 768);
    updateMedia();
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  }, []);
  const handleScrollClick = () => {
    const nextSection = document.getElementById("next-section") as HTMLElement;
    if (nextSection) {
      const offset = isMobile ? -100 : -50;
      window.scrollTo({
        top: nextSection.offsetTop + offset,
        behavior: "smooth",
      });
    }
  };

  useTextAnimation({
    textIds: ["homeHero_animate1", "homeHero_animate2", "textAnimate3"],
    iconId: "homeHero_icon",
    delay: 0.5,
    stagger: 0.05,
    fromHero: true,
  });

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
            <h1
              id="homeHero_animate1"
              className="md:text-[64px] text-[42px] leading-[52.8px] md:leading-[80px] font-normal w-fit  text-balance"
            >
              {data.Title}
            </h1>{" "}
            {/* <h2
              id="homeHero_animate2"
              className="md:text-[64px] text-[42px] leading-[52.8px] md:leading-[80px] font-normal"
            >
              timeless design with comfortable living.
            </h2> */}
          </div>{" "}
          <button onClick={handleScrollClick}>
            <div className="flex gap-[10px]">
              <h4 id="textAnimate3">{data.ScrollText}</h4>
              <ArrowDownIcon
                className="w-[32px] h-[32px]"
                id="homeHero_icon"
                handleScrollClick={handleScrollClick}
              />
            </div>{" "}
          </button>
        </div>
      </div>
    </section>
  );
}
