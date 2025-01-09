"use client";
import Image from "next/image";
import Breadcrumbs from "../General/Breadcrumbs";
import Button from "../General/Button";
import { useLocale } from "next-intl";
import { useWindowHeight } from "@/app/hooks/useWindowHeight";
import { useEffect, useRef } from "react";
import gsap from "gsap";

interface SingleCummunitiesHeroProps {
  imageSrc: string;
  heading: string;
  subheading: string;
  imgLogo: string;
  brochureLink?: string;
}

export default function SingleCummunitiesHero({
  imageSrc,
  heading,
  subheading,
  imgLogo,
  brochureLink,
}: SingleCummunitiesHeroProps) {
  const locale = useLocale();
  const windowHeight = useWindowHeight();
  const TABLET_MIN_HEIGHT = 500;

  const imageRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const subheadingRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const breadcrumbsRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const breadcrumbsList = [
    { title: "home", link: "/", pointerEvents: true },
    { title: "Communities", link: "/community", pointerEvents: true },
    { title: heading, pointerEvents: false },
  ];

  useEffect(() => {
    const splitHeading = heading
      .split(" ")
      .map(
        (word, i) =>
          `<span class="word-wrap" key="${i}">
            <span class="word">${word}</span>
          </span>`
      )
      .join(" ");

    const splitSubheading = subheading
      .split(" ")
      .map(
        (word, i) =>
          `<span class="word-wrap" key="${i}">
            <span class="word">${word}</span>
          </span>`
      )
      .join(" ");

    if (headingRef.current) headingRef.current.innerHTML = splitHeading;
    if (subheadingRef.current)
      subheadingRef.current.innerHTML = splitSubheading;

    gsap.set([imageRef.current, overlayRef.current], {
      scale: 1.1,
      opacity: 0,
    });
    gsap.set([logoRef.current, breadcrumbsRef.current], {
      y: 30,
      opacity: 0,
    });
    gsap.set(".heading .word", {
      y: 50,
      opacity: 0,
    });
    gsap.set(".subheading .word", {
      y: 30,
      opacity: 0,
    });
    gsap.set(buttonsRef.current, {
      y: 20,
      opacity: 0,
    });

    timelineRef.current = gsap.timeline({ paused: true });

    timelineRef.current
      .to([imageRef.current, overlayRef.current], {
        scale: 1,
        opacity: 1,
        duration: 1.8,
        ease: "power3.out",
      })
      .to(
        breadcrumbsRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=1.4"
      )
      .to(
        logoRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=1.2"
      )
      .to(
        ".heading .word",
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
        },
        "-=1"
      )
      .to(
        ".subheading .word",
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
        },
        "-=0.6"
      )
      .to(
        buttonsRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.4"
      );

    const startAnimation = () => {
      timelineRef.current?.play();
    };

    window.addEventListener("pageTransitionComplete", startAnimation);

    return () => {
      window.removeEventListener("pageTransitionComplete", startAnimation);
      timelineRef.current?.kill();
    };
  }, [heading, subheading]);

  return (
    <section className="relative h-[60vh] md:h-[96vh] md:min-h-[711px]">
      <div
        ref={overlayRef}
        className="absolute h-full w-full z-[1]"
        style={{
          background: `
            linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
            linear-gradient(231.3deg, rgba(0, 0, 0, 0) 27.76%, #000000 79.21%)
          `,
        }}
      />
      <div ref={imageRef} className="relative h-full w-full">
        <Image
          src={imageSrc}
          alt="heroimage"
          fill
          className="object-cover relative z-0"
          priority
        />
      </div>
      <div
        className={`absolute inset-0 max-w-[1400px] mx-auto w-full bottom-0 mb-auto transition-all duration-300 pt-[100px] left-0 gap-[24px] flex flex-col ${
          windowHeight >= TABLET_MIN_HEIGHT && windowHeight < 990
            ? "justify-start"
            : "justify-center"
        } items-start px-4 2xl:px-0 z-40`}
      >
        <div
          className={`flex flex-col justify-start items-start ${
            windowHeight >= TABLET_MIN_HEIGHT && windowHeight < 990
              ? "lg:gap-[20px]"
              : "lg:gap-[40px]"
          } lg:gap-[40px] gap-[24px] py-4`}
        >
          <div ref={breadcrumbsRef}>
            <Breadcrumbs list={breadcrumbsList} color="text-white" />
          </div>
          <div ref={logoRef}>
            <Image
              src={imgLogo}
              alt="heroimage"
              width={80}
              height={80}
              className="object-cover relative z-0 h-[80px] w-[80px]"
            />
          </div>
          <div className="flex flex-col gap-3 max-w-[500px] w-fit">
            <h1
              ref={headingRef}
              className="heading text-xl lg:text-[64px] lg:leading-[80px] font-medium text-white tracking-[0.5%]"
            />
            <h2
              ref={subheadingRef}
              className="subheading text-sm lg:text-base font-normal text-white"
            />
          </div>
          <div ref={buttonsRef} className="flex gap-3">
            <Button
              href={`/${locale}`}
              className="px-4 lg:px-5 py-[10px] lg:py-3 bg-white text-black border border-transparent hover:bg-transparent hover:text-white hover:border hover:border-white transition-all duration-300 rounded-[100px] h-fit text-nowrap flex items-center justify-center gap-2 !w-fit"
            >
              <span className="text-inherit text-sm lg:text-base  font-medium leading-[25px] text-start">
                Download Brochure
              </span>
            </Button>
            <Button
              href={`/${locale}/contact-us`}
              className="px-4 lg:px-5 py-[10px] lg:py-3 bg-transparent border border-white hover:bg-black/70 transition-all duration-300 rounded-[100px] h-fit text-nowrap flex items-center justify-center gap-2 !w-fit"
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
