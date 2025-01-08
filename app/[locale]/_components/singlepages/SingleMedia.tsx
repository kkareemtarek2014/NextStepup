"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import DiscoverSection from "../UI/General/DiscoverSection";
import GetintouchSection from "../UI/General/GetintouchSection";
import Breadcrumbs from "../UI/General/Breadcrumbs";
import FormattedDate from "../UI/media/FormattedDate";
import SocialShare from "../UI/media/SocialShare";
import BlogContent from "../UI/media/BlogContent";
import { MediaResponse } from "@/app/[locale]/types/media";
import Image from "next/image";

interface SingleMediaProps {
  data: MediaResponse;
}

export default function SingleMedia({ data }: SingleMediaProps) {
  const blogData = data.data[0];
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const breadcrumbsList = [
    {
      title: "home",
      link: "/",
      pointerEvents: true,
    },
    {
      title: "Media Center",
      link: "/media",
      pointerEvents: true,
    },
    {
      title: blogData.Title,
      pointerEvents: false,
    },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (sectionRef.current) {
      gsap.set(sectionRef.current, { opacity: 0 });
    }

    timelineRef.current = gsap.timeline({ paused: true });

    const setupAnimation = () => {
      if (!timelineRef.current) return;

      timelineRef.current
        .to(sectionRef.current, {
          opacity: 1,
          duration: 0.5,
        })
        .from(headerRef.current, {
          opacity: 0,
          y: 30,
          duration: 1,
          delay: 0.2,
        })
        .from(
          imageRef.current,
          {
            opacity: 0,
            y: 50,
            duration: 1,
          },
          "-=0.5"
        );

      gsap.utils
        .toArray<HTMLElement>(".blog-content > *")
        .forEach((element, i) => {
          gsap.from(element, {
            scrollTrigger: {
              trigger: element,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            opacity: 0,
            y: 30,
            duration: 0.8,
            delay: i * 0.1,
          });
        });
    };

    setupAnimation();

    const startAnimation = () => {
      timelineRef.current?.play();
    };

    window.addEventListener("pageTransitionComplete", startAnimation);

    return () => {
      window.removeEventListener("pageTransitionComplete", startAnimation);
      timelineRef.current?.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative h-fit bg-white">
      <div className="pt-[48px] pb-8 md:pt-[60px] lg:pt-[72px] lg:pb-[100px] px-4 md:px-10 flex flex-col relative mt-[100px] lg:mt-[120px]">
        <div
          ref={headerRef}
          className="max-w-[776px] mx-auto w-full flex flex-col gap-6 lg:gap-[40px]"
        >
          <Breadcrumbs list={breadcrumbsList} />
          <div className="flex flex-col gap-3">
            <FormattedDate
              date={new Date(blogData.publishedAt)}
              content={blogData.Content}
            />
            <h1 className="text-2xl md:text-4xl lg:text-[64px] font-medium text-black leading-normal lg:leading-[80px] tracking-[0.5%]">
              {blogData.Title}
            </h1>
            <p className="text-xl font-medium text-black">
              {blogData.Description}
            </p>
          </div>
          <SocialShare slug={blogData.slug} title={blogData.Title} widthFull />
        </div>

        <div
          ref={imageRef}
          className="h-[186.01px] lg:h-[750px] relative pb-[4px] mt-[44px] lg:mt-[72px] lg:pb-[100px]"
        >
          <Image
            src={`${process.env.NEXT_PUBLIC_IMAGES_DOMAIN}${blogData.Image?.url}`}
            alt={blogData.Image?.alternativeText}
            fill
            className="w-full h-[400px] lg:h-[750px] !relative object-cover"
          />
        </div>

        <div ref={contentRef} className="blog-content">
          <BlogContent content={blogData.Content} />
        </div>

        <div className="max-w-[776px] mx-auto w-full mt-8 social-share">
          <SocialShare slug={blogData.slug} title={blogData.Title} />
        </div>
      </div>

      <DiscoverSection />
      <GetintouchSection />
    </section>
  );
}
