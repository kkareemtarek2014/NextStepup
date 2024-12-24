"use client";
import gsap from "gsap";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const animatePageIn = (pageName: string) => {
  const bannerOne = document.getElementById("banner-1");
  const bannerTwo = document.getElementById("banner-2");
  const bannerThree = document.getElementById("banner-3");
  const bannerFour = document.getElementById("banner-4");
  const bannerText = document.getElementById("banner-text");

  if (bannerOne && bannerTwo && bannerThree && bannerFour && bannerText) {
    const tl = gsap.timeline();

    // Update text content
    bannerText.textContent = pageName;

    // Set initial states
    tl.set([bannerOne, bannerTwo, bannerThree, bannerFour], {
      yPercent: 0,
    });

    // Fade in the text
    tl.to(bannerText, {
      opacity: 1,
      duration: 0.8,
      ease: "power2.inOut",
    });

    // Wait a bit then animate the banners
    tl.to(bannerText, {
      opacity: 0,
      duration: 0.3,
      delay: 0.5,
      ease: "power2.inOut",
    });

    // Animate banners out
    tl.to([bannerOne, bannerTwo, bannerThree, bannerFour], {
      yPercent: 100,
      duration: 0.4,
      stagger: 0.2,
      ease: "power3.inOut",
    });
  }
};

export const animatePageOut = (href: string, route: AppRouterInstance) => {
  const bannerOne = document.getElementById("banner-1");
  const bannerTwo = document.getElementById("banner-2");
  const bannerThree = document.getElementById("banner-3");
  const bannerFour = document.getElementById("banner-4");
  const bannerText = document.getElementById("banner-text");

  if (bannerOne && bannerTwo && bannerThree && bannerFour && bannerText) {
    const tl = gsap.timeline();

    tl.set([bannerOne, bannerTwo, bannerThree, bannerFour], {
      yPercent: -100,
    });

    tl.to([bannerOne, bannerTwo, bannerThree, bannerFour], {
      yPercent: 0,
      duration: 0.4,
      stagger: 0.2,
      ease: "power3.inOut",
      onComplete: () => {
        route.push(href);
      },
    });
  }
};
