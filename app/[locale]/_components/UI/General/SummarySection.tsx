"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

interface ImageFormat {
  url: string;
  width: number;
  height: number;
}

interface ImageData {
  url: string;
  alternativeText: string | null;
  formats?: {
    large?: ImageFormat;
    medium?: ImageFormat;
    small?: ImageFormat;
    thumbnail?: ImageFormat;
  };
}

interface FeaturedItem {
  id: number;
  Title: string;
  SubTitle: string;
  Description: string;
  Image: ImageData;
}

interface SummarySectionProps {
  featuredData?: FeaturedItem[];
}

export default function SummarySection({ featuredData }: SummarySectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!featuredData?.length) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.set(".summary-item", {
        opacity: 0,
        y: 100,
      });

      gsap.set(".summary-image", {
        opacity: 0,
        x: -100,
        scale: 0.95,
      });

      gsap.set(".summary-content", {
        opacity: 0,
        x: 60,
        scale: 0.98,
      });

      document.querySelectorAll(".summary-item").forEach((item) => {
        const image = item.querySelector(".summary-image");
        const content = item.querySelector(".summary-content");
        const title = content?.querySelector("h3");
        const subtitle = content?.querySelector("h3:nth-child(2)");
        const description = content?.querySelector("p");

        gsap
          .timeline({
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
              end: "top 20%",
              toggleActions: "play none none none",
            },
          })
          .to(item, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          })
          .to(
            image,
            {
              opacity: 1,
              x: 0,
              scale: 1,
              duration: 1,
              ease: "power3.out",
            },
            "-=0.6"
          )
          .to(
            content,
            {
              opacity: 1,
              x: 0,
              scale: 1,
              duration: 0.8,
              ease: "power2.out",
            },
            "-=0.7"
          )
          .to(
            [title, subtitle, description],
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.1,
              ease: "power2.out",
            },
            "-=0.5"
          );
      });

      document.querySelectorAll(".summary-item").forEach((item) => {
        const image = item.querySelector(".summary-image");

        item.addEventListener("mouseenter", () => {
          gsap.to(image, {
            scale: 1.03,
            duration: 0.4,
            ease: "power2.out",
          });
        });

        item.addEventListener("mouseleave", () => {
          gsap.to(image, {
            scale: 1,
            duration: 0.4,
            ease: "power2.out",
          });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [featuredData]);

  return (
    <section ref={sectionRef} className="relative h-fit bg-white">
      <div className="flex flex-col py-[40px] max-w-[1512px] mx-auto">
        {featuredData?.map((item) => (
          <div
            key={item.id}
            className="summary-item flex lg:gap-[18.71%] py-[60px] border-b border-t border-black/20 gap-[24px] mx-4 lg:mx-0 flex-col lg:flex-row lg:px-[56px]"
          >
            <div className="summary-image lg:w-[28.57%] w-full h-[200px] max-w-[240px] lg:max-w-full">
              <Image
                src={`${process.env.NEXT_PUBLIC_IMAGES_DOMAIN}${item.Image.url}`}
                alt={item.Image.alternativeText || item.SubTitle}
                fill
                className="object-cover !relative z-0"
              />
            </div>
            <div className="summary-content lg:w-[51.71%] h-fit flex flex-col gap-3 lg:gap-[59px] w-full">
              <div className="gap-3">
                <h3 className="text-[28px] lg:text-[40px] font-medium text-black leading-[35px] lg:leading-[50px]">
                  {item.Title}
                </h3>
                <h3 className="text-2xl lg:text-[28px] font-medium text-primary leading-[30px] lg:leading-[35px]">
                  {item.SubTitle}
                </h3>
              </div>
              <div className="w-full">
                <p className="text-sm lg:text-base text-black font-normal lg:font-semimedium">
                  {item.Description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
