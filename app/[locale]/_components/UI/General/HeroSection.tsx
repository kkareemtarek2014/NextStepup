"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { usePathname } from "next/navigation";

interface HeroSectionProps {
  imageSrc: string;
  heading: string;
  subheading: string;
}

export default function HeroSection({
  imageSrc,
  heading,
  subheading,
}: HeroSectionProps) {
  const imageRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const subheadingRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const pathname = usePathname();

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

    // Set initial states
    gsap.set(imageRef.current, {
      scale: 1.2,
      y: 100,
      opacity: 0,
    });
    gsap.set(".heading .word", {
      y: 100,
      opacity: 0,
    });
    gsap.set(".subheading .word", {
      y: 50,
      opacity: 0,
    });

    const shouldUseTimeline = pathname === "/" || pathname === "/community" || pathname === "/community/[slug]";
console.log(shouldUseTimeline)
    if (shouldUseTimeline) {
      timelineRef.current = gsap.timeline({ paused: true });

      timelineRef.current
        .to(imageRef.current, {
          scale: 1,
          y: 0,
          opacity: 1,
          duration: 1.5,
          ease: "power3.out",
        })
        .to(
          ".heading .word",
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
          },
          "-=0.8"
        )
        .to(
          ".subheading .word",
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
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
    } else {
      gsap.to(imageRef.current, {
        scale: 1,
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: "power3.out",
      });
      gsap.to(".heading .word", {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      });
      gsap.to(".subheading .word", {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
      });
    }
  }, [heading, subheading, pathname]);

  return (
    <section className="relative h-[60vh] md:h-[71vh] overflow-hidden">
      <div className="absolute h-full w-full bg-black/20 z-[1]"></div>
      <div ref={imageRef} className="relative h-full w-full">
        <Image
          src={imageSrc}
          alt="heroimage"
          fill
          className="object-cover relative z-0"
          priority
        />
      </div>
      <div className="absolute w-full z-[2] flex flex-col bottom-0 left-0 text-white gap-[24px] pb-[100px]">
        <div className="max-w-[1400px] mx-auto w-full gap-[24px] flex flex-col justify-start items-start px-4 2xl:px-0">
          <div className="flex flex-col justify-start items-start">
            <h1
              ref={headingRef}
              className="heading md:text-[64px] lg:text-[120px] lg:leading-[150px] text-[42px] leading-[52.8px] md:leading-[80px] font-normal text-white"
            ></h1>
            <h2
              ref={subheadingRef}
              className="subheading md:text-[21px] text-2xl lg:text-[28px] leading-[30px] lg:leading-[36px] font-normal w-fit text-white lg:text-balance break-words"
            ></h2>
          </div>
        </div>
      </div>
    </section>
  );
}
