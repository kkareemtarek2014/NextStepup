"use client";
import { useEffect, useRef } from "react";
import Button from "./Button";
import ArrowIcon from "../../Icons/ArrowIcon";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function GetintouchSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Simple fade in and slide up animation for both elements
      gsap.from([headingRef.current, buttonRef.current], {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // Simple hover effect for button
      if (buttonRef.current) {
        buttonRef.current.addEventListener("mouseenter", () => {
          gsap.to(buttonRef.current, { scale: 1.05, duration: 0.3 });
        });

        buttonRef.current.addEventListener("mouseleave", () => {
          gsap.to(buttonRef.current, { scale: 1, duration: 0.3 });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-fit bg-borderColor">
      <div className="py-[40px] lg:py-[80px] max-w-[992px] mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row xl:gap-[100px] gap-8 items-start lg:items-center">
          <div className="w-full md:w-fit md:min-w-[736px]">
            <h3
              ref={headingRef}
              className="text-[28px] md:text-[40px] font-medium text-start text-black leading-[35px] md:leading-[50px] lg:text-balance"
            >
              Are you interested in a property or have any other inquiries?
            </h3>
          </div>
          <div ref={buttonRef}>
            <Button
              href="/contact-us"
              className="cta-button px-5 py-3 bg-black rounded-[100px] h-fit text-nowrap flex items-center justify-center gap-2 !w-fit hover:shadow-lg transition-shadow"
              iconComponent={
                <ArrowIcon className="arrow-icon rotate-180 h-4 w-4 lg:h-5 lg:w-5 text-white" />
              }
            >
              <span className="text-white text-sm lg:text-base font-medium leading-[25px] text-start">
                Get in touch
              </span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
