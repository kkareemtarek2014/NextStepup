"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

interface TextAnimationProps {
  textIds: string[];
  iconId?: string;
  videoId?: string;
  delay?: number;
  stagger?: number;
  fromHero?: boolean;
}

export const useTextAnimation = ({
  textIds,
  iconId,
  videoId,
  delay = 0.5,
  stagger = 0.05,
  fromHero = false,
}: TextAnimationProps) => {
  const textRefs = useRef<(HTMLElement | null)[]>([]);
  const hasAnimated = useRef(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (hasAnimated.current) return;

    const firstElement = document.getElementById(textIds[0]);
    if (!firstElement) return;

    const tl = gsap.timeline({
      scrollTrigger: fromHero
        ? undefined
        : {
            trigger: firstElement,
            start: "top 40%",
            toggleActions: "play none none none",
            // markers: true,
            onEnter: () => {
              startAnimation();
            },
          },
      paused: true,
    });

    // Get only existing elements
    const existingElements = textIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    if (existingElements.length === 0) return;

    // Initially hide the icon if it exists
    if (iconId) {
      const iconElement = document.getElementById(iconId);
      if (iconElement) {
        gsap.set(iconElement, { opacity: 0 });
      }
    }

    // Initially hide the video if it exists
    if (videoId) {
      const videoElement = document.getElementById(videoId);
      if (videoElement) {
        gsap.set(videoElement, {
          opacity: 0,
          yPercent: 50,
        });
      }
    }

    // Text animations only for existing elements
    existingElements.forEach((element, index) => {
      const originalText = element.textContent || "";
      textRefs.current[index] = element;

      // Store original text content
      element.setAttribute("data-original-text", originalText);

      const letters = originalText.split("").map((letter) => {
        const span = document.createElement("span");
        if (letter === " ") {
          span.innerHTML = " ";
          span.style.width = "0.3em";
        } else {
          span.innerHTML = letter;
        }
        span.style.display = "inline-block";
        span.style.opacity = "0";
        return span;
      });

      element.innerHTML = "";
      letters.forEach((span) => element.appendChild(span));

      tl.to(
        letters,
        {
          opacity: 1,
          duration: 0.5,
          stagger: stagger,
          ease: "power2.out",
        },
        index === 0 ? ">" : `>-${delay}`
      );
    });

    // Add icon animation after text animations complete
    if (iconId) {
      const iconElement = document.getElementById(iconId);
      if (iconElement) {
        tl.to(iconElement, {
          opacity: 1,
          duration: 0.3,
        }).to(
          iconElement,
          {
            y: -20,
            duration: 0.5,
            ease: "power2.out",
            repeat: -1,
            yoyo: true,
            yoyoEase: "bounce.out",
          },
          ">"
        );
      }
    }

    // Add video animation after text animations complete
    if (videoId) {
      const videoElement = document.getElementById(videoId);
      if (videoElement) {
        tl.to(
          videoElement,
          {
            opacity: 1,
            yPercent: 0,
            duration: 0.2,
            ease: "power2.out",
          },
          ">"
        );
      }
    }

    const startAnimation = () => {
      tl.play();
      hasAnimated.current = true;
    };

    if (fromHero) {
      window.addEventListener("pageTransitionComplete", startAnimation);
      return () => {
        window.removeEventListener("pageTransitionComplete", startAnimation);
        cleanup();
      };
    } else {
      return cleanup;
    }

    function cleanup() {
      tl.kill();
      // Restore original text on cleanup
      textRefs.current.forEach((element) => {
        if (element) {
          const originalText = element.getAttribute("data-original-text");
          if (originalText) {
            element.innerHTML = originalText;
          }
        }
      });
    }
  }, [textIds, iconId, videoId, delay, stagger, fromHero]);

  return null;
};

interface TextAnimateProps {
  texts: string[];
  ids: string[];
  className?: string;
  fromHero?: boolean;
}

export const TextAnimate: React.FC<TextAnimateProps> = ({
  texts,
  ids,
  className = "",
  fromHero = false,
}) => {
  useTextAnimation({ textIds: ids, fromHero });

  return (
    <div>
      {texts.map((text, index) => (
        <div key={ids[index]} id={ids[index]} className={className}>
          {text}
        </div>
      ))}
    </div>
  );
};
