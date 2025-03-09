"use client";

import { useLocale } from "next-intl";
import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function Footer() {
  const arrowRef = useRef<HTMLDivElement>(null);
  const locale = useLocale();

  useEffect(() => {
    const arrow = arrowRef.current;
    if (!arrow) return;

    const hoverAnimation = gsap.to(arrow, {
      y: -10,
      duration: 0.4,
      ease: "power2.out",
      paused: true,
    });

    const onHover = () => hoverAnimation.play();
    const onLeave = () => hoverAnimation.reverse();

    arrow.addEventListener("mouseenter", onHover);
    arrow.addEventListener("mouseleave", onLeave);

    return () => {
      arrow.removeEventListener("mouseenter", onHover);
      arrow.removeEventListener("mouseleave", onLeave);
      hoverAnimation.kill();
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="block top-0 left-0 right-0 z-50 w-full bg-black">
      <button
        onClick={scrollToTop}
        className="flex items-start justify-start lg:items-center lg:justify-center  transition-all"
      >
        <div ref={arrowRef}>
          {/* <ArrowDownIcon className="block w-[32px] h-[32px] rotate-180" /> */}
        </div>
      </button>
    </footer>
  );
}
