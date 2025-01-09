"use client";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState, useRef, useEffect } from "react";
import Button from "./Button";
import ArrowIcon from "../../Icons/ArrowIcon";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { CummunityList } from "@/app/[locale]/api/general";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

interface CommunityData {
  id: number;
  documentId: string;
  slug: string;
  Location: string;
  statusType: string;
  UnitType: string;
  Type: string;
  HeroSection: {
    id: number;
    Title: string;
    Description: string;
    MainImage: {
      id: number;
      documentId: string;
      url: string;
      formats: {
        large: ImageFormat;
        small: ImageFormat;
        medium: ImageFormat;
        thumbnail: ImageFormat;
      };
    };
  };
  HighlightSection: {
    id: number;
    Title: string;
  };
}

interface ImageFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: null;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
}

interface CommunitySectionProps {
  title?: string;
  button?: {
    text: string;
    href: string;
  };
}

export default function CommunitySection({
  title,
  button,
}: CommunitySectionProps) {
  const { locale } = useParams();
  const pathname = usePathname();
  const [communityData, setCommunityData] = useState<CommunityData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const sliderRef = useRef<Slider>(null);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [slidesToShow, setSlidesToShow] = useState<number>(2.2);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 640) {
        setSlidesToShow(1);
      } else if (window.innerWidth <= 1024) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(2.2);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const response = await CummunityList(locale as string);
        const uniqueCommunities = response.data
          .filter(
            (community, index, self) =>
              index === self.findIndex((c) => c.slug === community.slug)
          )
          .filter(
            (community) => !pathname.includes(community.slug)
          ) as CommunityData[];

        setCommunityData(uniqueCommunities);
      } catch (error) {
        console.error("Error fetching communities:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCommunities();
  }, [locale, pathname]);

  useEffect(() => {
    if (!communityData.length || typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const headerElements = document.querySelectorAll(
        ".community-section .animate-header > *"
      );
      gsap.set(headerElements, {
        opacity: 0,
        y: -50,
      });

      const sliderElement = document.querySelector(".animate-slider");
      gsap.set(sliderElement, {
        opacity: 0,
        x: 100,
      });

      const progressElement = document.querySelector(".animate-progress");
      gsap.set(progressElement, {
        opacity: 0,
        y: 50,
      });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: ".community-section",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        })
        .to(headerElements, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
        })
        .to(
          sliderElement,
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power2.out",
          },
          "-=0.4"
        )
        .to(
          progressElement,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.6"
        );
    });

    return () => ctx.revert();
  }, [communityData]);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    beforeChange: (current: number, next: number) => setCurrentSlide(next),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1.2,
        },
      },
    ],
    arrows: false,
    className: "community-slider",
  };

  const goToNext = () => {
    sliderRef.current?.slickNext();
  };

  const goToPrev = () => {
    sliderRef.current?.slickPrev();
  };

  const calculateProgress = () => {
    const totalSlides = communityData.length;
    const maxProgress = totalSlides - slidesToShow;
    if (currentSlide === 0) {
      return "25%";
    } else {
      const progress = (currentSlide / maxProgress) * 75 + 25;
      return `${Math.min(progress, 100)}%`;
    }
  };

  return (
    <section className="relative h-fit bg-teamColor pb-[40px] lg:pb-0 community-section overflow-hidden">
      <div className="max-w-[1512px] mx-auto">
        <div className="flex flex-col lg:gap-0 px-4 lg:px-[56px] lg:pb-[40px] h-fit">
          {title && (
            <div className="animate-header flex flex-col lg:flex-row justify-start pt-[40px] lg:py-[40px] lg:justify-between items-start lg:items-center lg:ps-4 gap-[24px]">
              <h3 className="text-[28px] lg:text-[64px] lg:leading-[80px] font-medium text-start text-black">
                {title}
              </h3>
              {button && (
                <Link
                  href={button.href}
                  className="border border-black rounded-[100px] transition-all duration-300 bg-white text-black hover:bg-black hover:text-white flex gap-1 py-2 px-4 items-center justify-start w-fit"
                >
                  <span className="text-inherit text-base font-medium leading-[25px] text-start">
                    {button.text}
                  </span>
                  <ArrowIcon className="rotate-180 text-inherit h-5 w-5" />
                </Link>
              )}
            </div>
          )}
          <div className="animate-slider relative lg:mb-[90px] mb-[40px]">
            <button
              onClick={goToPrev}
              className="absolute hidden lg:block top-1/2 -left-[2rem] -translate-y-1/2 z-10 p-4 hover:opacity-75 transition-opacity bg-black text-white hover:bg-primary rounded-full"
              aria-label="Previous slide"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 12.1561H3.57249M11.6397 3L3 12L11.6397 21"
                  stroke="white"
                />
              </svg>
            </button>

            <Slider
              ref={sliderRef}
              {...settings}
              className="community-slider pt-[40px] lg:pt-0"
            >
              {isLoading ? (
                <div className="flex justify-center items-center min-h-[400px]">
                  <div className="animate-spin">Loading...</div>
                </div>
              ) : (
                communityData.map((community, index) => (
                  <div
                    key={community.id}
                    className="bg-gray-100 relative flex flex-col pe-[20px] lg:pe-0 h-full"
                  >
                    <div className="relative h-full">
                      <div className="relative h-[160px] lg:h-[320px]">
                        <Image
                          src={`${process.env.NEXT_PUBLIC_IMAGES_DOMAIN}${community.HeroSection.MainImage.url}`}
                          alt={community.Location}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="relative w-full h-full">
                        <div className="bg-white p-4 lg:p-[28px] !pb-[48px] h-[222px] md:h-[280px] 2xl:!h-full">
                          <div className="flex flex-col gap-5 justify-between h-full">
                            <div className="flex flex-col gap-3">
                              <span className="text-base font-medium text-primary leading-[22.4px] uppercase tracking-wider">
                                {community.Location} • {community.statusType}
                              </span>
                              <h3 className="text-[28px] lg:text-[40px] font-medium leading-[35px] lg:leading-[50px] text-black uppercase">
                                {community.HeroSection.Title}
                              </h3>
                            </div>
                            <Button
                              href={`/community/${community.slug}`}
                              className="px-4 lg:px-5 py-[10px] lg:py-3 bg-black rounded-[100px] h-fit text-nowrap flex items-center justify-center gap-2 !w-fit"
                              iconComponent={
                                <ArrowIcon className="rotate-180 text-white" />
                              }
                            >
                              <span className="text-white text-sm lg:text-base font-medium leading-[25px] text-start">
                                View Project
                              </span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </Slider>

            <button
              onClick={goToNext}
              className="absolute hidden lg:block top-1/2 -right-[1rem] -translate-y-1/2 z-10 p-4 hover:opacity-75 transition-opacity bg-black text-white rounded-full"
              aria-label="Next slide"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="rotate-180"
              >
                <path
                  d="M21 12.1561H3.57249M11.6397 3L3 12L11.6397 21"
                  stroke="white"
                />
              </svg>
            </button>
          </div>

          <div className="animate-progress relative w-auto  h-[2px] bg-black/20">
            <div
              className="absolute h-full bg-black transition-all duration-300 ease-in-out"
              style={{ width: calculateProgress() }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
