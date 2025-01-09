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
  buttonWithTitle?: boolean;
  animationType?: "letter" | "word";
  paragraphIndex?: number;
}

export const useTextAnimation = ({
  textIds,
  iconId,
  videoId,
  delay = 0.02,
  stagger = 0.01,
  fromHero = false,
  buttonWithTitle = false,
  animationType = "letter",
  paragraphIndex = 2,
}: TextAnimationProps) => {
  const textRefs = useRef<(HTMLElement | null)[]>([]);
  const hasAnimated = useRef(false);

  useEffect(() => {
    // Check if it's a mobile device
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      // For mobile, just make elements visible without animation
      textIds.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          gsap.set(element, { opacity: 1, y: 0 });
        }
      });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    if (hasAnimated.current) return;

    const firstElement = document.getElementById(textIds[0]);
    if (!firstElement) return;

    const tl = gsap.timeline({
      scrollTrigger: fromHero
        ? undefined
        : {
            trigger: firstElement,
            start: "top 75%",
            toggleActions: "play complete none none",
            onEnter: () => {
              startAnimation();
            },
          },
      paused: true,
    });

    const textElements = textIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    if (textElements.length === 0) return;

    textElements.forEach((element, index) => {
      if (index === paragraphIndex || (buttonWithTitle && index === 3)) {
        gsap.set(element, {
          opacity: 0,
          y: 20,
        });

        tl.to(
          element,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.4"
        );
      } else if (buttonWithTitle && index === 2) {
        gsap.set(element, {
          opacity: 0,
          x: 100,
        });

        tl.to(
          element,
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "<"
        );
      } else {
        const originalText = element.textContent || "";
        textRefs.current[index] = element;
        element.setAttribute("data-original-text", originalText);

        const container = document.createElement("div");
        container.style.display = "block";
        container.style.width = "100%";

        if (animationType === "word") {
          const words = originalText.split(/\s+/);
          words.forEach((word, wordIndex) => {
            const wordSpan = document.createElement("span");
            wordSpan.style.display = "inline-block";
            wordSpan.style.whiteSpace = "nowrap";
            wordSpan.style.opacity = "0";
            wordSpan.textContent = word;
            container.appendChild(wordSpan);

            if (wordIndex < words.length - 1) {
              const spaceSpan = document.createElement("span");
              spaceSpan.style.display = "inline-block";
              spaceSpan.innerHTML = "&nbsp;";
              container.appendChild(spaceSpan);
            }
          });
        } else {
          const chars = originalText.split("");
          chars.forEach((char) => {
            const charSpan = document.createElement("span");
            charSpan.style.display = "inline-block";
            charSpan.style.opacity = "0";
            charSpan.textContent = char === " " ? "\u00A0" : char;
            container.appendChild(charSpan);
          });
        }

        element.innerHTML = "";
        element.appendChild(container);

        tl.to(
          container.getElementsByTagName("span"),
          {
            opacity: 1,
            duration: 0.3,
            stagger: stagger,
            ease: "power2.out",
          },
          index === 0 ? ">" : `>-${delay}`
        );
      }
    });

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
      textRefs.current.forEach((element) => {
        if (element) {
          const originalText = element.getAttribute("data-original-text");
          if (originalText) {
            element.innerHTML = originalText;
          }
        }
      });
    }
  }, [
    textIds,
    iconId,
    videoId,
    delay,
    stagger,
    fromHero,
    buttonWithTitle,
    animationType,
  ]);

  return null;
};

interface TextAnimateProps {
  texts: string[];
  ids: string[];
  className?: string;
  fromHero?: boolean;
  animationType?: "letter" | "word";
}

export const TextAnimate: React.FC<TextAnimateProps> = ({
  texts,
  ids,
  className = "",
  fromHero = false,
  animationType = "letter",
}) => {
  useTextAnimation({ textIds: ids, fromHero, animationType });

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
