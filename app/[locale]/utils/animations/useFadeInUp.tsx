"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

interface FadeInUpProps {
  elementIds: string[];
  delay?: number;
  stagger?: number;
  fromY?: number;
  duration?: number;
  onComplete?: () => void;
}

export const useFadeInUp = ({
  elementIds,
  delay = 0.2,
  stagger = 0.2,
  fromY = 50,
  duration = 0.8,
  onComplete,
}: FadeInUpProps) => {
  const hasAnimated = useRef(false);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const contextRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    hasAnimated.current = false;

    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    const elements = elementIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    // Set initial state
    gsap.set(elements, {
      opacity: 1,
      y: fromY,
    });

    contextRef.current = gsap.context(() => {
      timelineRef.current = gsap.timeline({
        paused: true,
        scrollTrigger: {
          trigger: elements[0],
          start: "top 80%",
          toggleActions: "play none none none",
          onEnter: () => {
            if (!hasAnimated.current && timelineRef.current) {
              timelineRef.current.play();
            }
          },
        },
      });

      timelineRef.current.to(elements, {
        opacity: 1,
        y: 0,
        duration: duration,
        stagger: stagger,
        delay: delay,
        ease: "power3.out",
        onComplete: () => {
          hasAnimated.current = true;
          onComplete?.();
        },
      });
    });

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }
      if (contextRef.current) {
        contextRef.current.revert();
      }
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === elements[0]) {
          trigger.kill();
        }
      });
    };
  }, [elementIds, delay, stagger, fromY, duration]);
};
