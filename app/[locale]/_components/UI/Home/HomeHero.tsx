"use client";
import Image from "next/image";
import ArrowDownIcon from "../../Icons/ArrowDownIcon";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function HomeHero({ data }: { data: any }) {
  const imageRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const scrollButtonRef = useRef<HTMLButtonElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const handleScrollClick = () => {
    const nextSection = document.getElementById("next-section") as HTMLElement;
    if (nextSection) {
      window.scrollTo({
        top: nextSection.offsetTop - 50,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    // Split text into words for animation
    if (titleRef.current && data.Title) {
      const words = data.Title.split(" ");
      titleRef.current.innerHTML = words
        .map(
          (word: string) =>
            `<span class="word-wrap"><span class="word">${word}</span></span>`
        )
        .join(" ");
    }

    // Set initial states
    gsap.set([imageRef.current, overlayRef.current], {
      scale: 1.1,
      opacity: 0,
    });
    gsap.set(".word", {
      y: 50,
      opacity: 0,
    });
    gsap.set(scrollButtonRef.current, {
      y: 30,
      opacity: 0,
    });
    gsap.set(arrowRef.current, {
      y: 30,
      opacity: 0,
    });

    // Create animation timeline but don't start it yet
    timelineRef.current = gsap.timeline({ paused: true });

    // Image and overlay animation
    timelineRef.current
      .to([imageRef.current, overlayRef.current], {
        scale: 1,
        opacity: 1,
        duration: 1.5,
        ease: "power3.out",
      })
      // Text animation
      .to(
        ".word",
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
        },
        "-=0.8"
      )
      // Scroll button animation
      .to(
        scrollButtonRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.4"
      )
      // Arrow animation with continuous bounce
      .to(
        arrowRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          onComplete: () => {
            gsap.to(arrowRef.current, {
              y: "-=10",
              duration: 1,
              repeat: -1,
              yoyo: true,
              ease: "power1.inOut",
            });
          },
        },
        "-=0.3"
      );

    // Start animation when page transition is complete
    const startAnimation = () => {
      timelineRef.current?.play();
    };

    window.addEventListener("pageTransitionComplete", startAnimation);

    return () => {
      window.removeEventListener("pageTransitionComplete", startAnimation);
      timelineRef.current?.kill();
    };
  }, [data.Title]);

  return (
    <section className="relative h-[80vh] md:h-[90vh]">
      <div
        ref={overlayRef}
        className="absolute h-full w-full bg-black/20 z-[1]"
      />
      <div ref={imageRef} className="relative h-full w-full">
        <Image
          src="/img/homeHero.webp"
          alt="heroimage"
          fill
          className="object-cover relative z-0"
        />
      </div>
      <div className="absolute w-full z-[2] flex flex-col bottom-0 left-0 text-white gap-[24px] pb-[100px]">
        <div className="max-w-[1400px] mx-auto w-full gap-[24px] flex flex-col justify-start items-start px-4 2xl:px-0">
          <div className="flex flex-col justify-start items-start">
            <h1
              ref={titleRef}
              className="md:text-[64px] text-[42px] leading-[52.8px] md:leading-[80px] font-normal w-fit text-balance"
            />
          </div>
          <button ref={scrollButtonRef} onClick={handleScrollClick}>
            <div className="flex gap-[10px] items-center">
              <h4>{data.ScrollText}</h4>
              <div ref={arrowRef}>
                <ArrowDownIcon
                  className="w-[32px] h-[32px]"
                  handleScrollClick={handleScrollClick}
                />
              </div>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
