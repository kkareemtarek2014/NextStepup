"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

interface ScaleInProps {
  elementIds: string[];
  delay?: number;
  stagger?: number;
  fromScale?: number;
  duration?: number;
}

export const useScaleIn = ({
  elementIds,
  delay = 0.2,
  stagger = 0.2,
  fromScale = 0.8,
  duration = 0.8,
}: ScaleInProps) => {
  const hasAnimated = useRef(false);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    // Register ScrollTrigger
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    // Reset animation state when elements change
    hasAnimated.current = false;

    // Kill previous timeline if it exists
    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    const elements = elementIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    // Set initial state
    gsap.set(elements, {
      opacity: 0,
      scale: fromScale,
    });

    // Create new timeline
    timelineRef.current = gsap.timeline({
      paused: true,
      scrollTrigger: {
        trigger: elements[0],
        start: "top 80%",
        toggleActions: "play complete none none",
        onEnter: () => {
          if (!hasAnimated.current && timelineRef.current) {
            timelineRef.current.play();
          }
        },
      },
    });

    // Add animation to timeline
    timelineRef.current.to(elements, {
      opacity: 1,
      scale: 1,
      duration: duration,
      stagger: stagger,
      delay: delay,
      ease: "back.out(1.7)",
      onComplete: () => {
        hasAnimated.current = true;
      },
    });

    // Cleanup
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [elementIds, delay, stagger, fromScale, duration]);
};
