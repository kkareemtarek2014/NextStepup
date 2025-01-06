"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

interface CountAnimationProps {
  elementId: string;
  endValue: number;
  duration?: number;
  delay?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

export const useCountAnimation = ({
  elementId,
  endValue,
  duration = 2,
  delay = 0,
  prefix = "",
  suffix = "",
  decimals = 0,
}: CountAnimationProps) => {
  const hasAnimated = useRef(false);
  const element = useRef<HTMLElement | null>(null);

  const formatNumber = (num: number, decimals: number) => {
    if (decimals === 0) return Math.round(num).toString();

    // Convert to string with fixed decimals and remove trailing zeros
    return Number(num.toFixed(decimals)).toString();
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    if (hasAnimated.current) return;

    element.current = document.getElementById(elementId);
    if (!element.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: element.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      let currentValue = { value: 0 };

      tl.to(currentValue, {
        value: endValue,
        duration: duration,
        delay: delay,
        ease: "power2.out",
        onUpdate: () => {
          if (element.current) {
            const formattedValue = formatNumber(currentValue.value, decimals);
            element.current.textContent = `${prefix}${formattedValue}${suffix}`;
          }
        },
        onComplete: () => {
          hasAnimated.current = true;
        },
      });
    });

    return () => ctx.revert();
  }, [elementId, endValue, duration, delay, prefix, suffix, decimals]);
};
