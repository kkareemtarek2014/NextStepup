"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

interface SlideInProps {
  elementIds: string[];
  delay?: number;
  stagger?: number;
  fromX?: number;
  duration?: number;
  onComplete?: () => void;
}

export const useSlideIn = ({
  elementIds,
  delay = 0.2,
  stagger = 0.2,
  fromX = 100,
  duration = 0.8,
  onComplete,
}: SlideInProps) => {
  const hasAnimated = useRef(false);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (hasAnimated.current) return;

    const elements = elementIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    // Kill previous timeline if it exists
    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    // Set initial state
    gsap.set(elements, {
      x: fromX,
      opacity: 0,
    });

    // Create new timeline
    timelineRef.current = gsap.timeline({
      scrollTrigger: {
        trigger: elements[0],
        start: "top 75%",
        toggleActions: "play none none none",
      },
    });

    // Animate title and button first
    const headerElements = elements.slice(0, 2);
    if (headerElements.length > 0) {
      timelineRef.current.to(headerElements, {
        x: 0,
        opacity: 1,
        duration: duration,
        stagger: stagger,
        ease: "power2.out",
      });
    }

    // Animate slider items with a slight delay
    const sliderElements = elements.slice(2);
    if (sliderElements.length > 0) {
      timelineRef.current.to(
        sliderElements,
        {
          x: 0,
          opacity: 1,
          duration: duration,
          stagger: stagger,
          ease: "power2.out",
        },
        ">-0.2"
      );
    }
  }, [elementIds, delay, stagger, fromX, duration]);
};
