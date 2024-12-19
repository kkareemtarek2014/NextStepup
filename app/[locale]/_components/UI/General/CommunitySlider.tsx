"use client";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState, useRef, useEffect } from "react";
import Button from "./Button";
import ArrowIcon from "../../Icons/ArrowIcon";

interface BlogPost {
  title: string;
  stats: string;
  image: string;
  category: string;
}

const blogPosts: BlogPost[] = [
  {
    title: "SEASHELL RAS EL HEKMA",
    stats: "Completed",
    image: "/img/ProjectExample.svg",
    category: "North Coast",
  },
  {
    title: "PLAYA GHAZALA BAY",
    stats: "Completed",
    image: "/img/ProjectExample.svg",
    category: "North Coast",
  },
  {
    title: "NEW KAIRO",
    stats: "Completed",
    image: "/img/ProjectExample.svg",
    category: "North Coast",
  },
  {
    title: "SEASHELL RAS EL HEKMA",
    stats: "Completed",
    image: "/img/ProjectExample.svg",
    category: "North Coast",
  },
  {
    title: "SEASHELL RAS EL HEKMA",
    stats: "Completed",
    image: "/img/ProjectExample.svg",
    category: "North Coast",
  },
  // ... add more blog posts
];

export default function BlogSlider() {
  const sliderRef = useRef<Slider>(null);
  const [currentSlide, setCurrentSlide] = useState<number>(1);
  const [slidesToShow, setSlidesToShow] = useState<number>(2.3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 640) {
        setSlidesToShow(1);
      } else if (window.innerWidth <= 1024) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(2.3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
          slidesToShow: 1.05,
        },
      },
    ],
    arrows: false,
    className: "gap-5 ",
  };

  const goToNext = () => {
    sliderRef.current?.slickNext();
  };

  const goToPrev = () => {
    sliderRef.current?.slickPrev();
  };
  const calculateProgress = () => {
    const totalSlides = blogPosts.length;
    const maxProgress = totalSlides - slidesToShow;
    if (currentSlide < 1) {
      return "25%";
    } else {
      const progress = (currentSlide / maxProgress) * 75 + 25;
      return `${Math.min(progress, 100)}%`;
    }
  };

  return (
    <section className="relative h-fit bg-teamColor pb-[40px] lg:pb-0">
      <div className="max-w-[1512px] mx-auto">
        <div className="flex flex-col gap-[48px] px-4 lg:px-[56px] lg:pb-[40px] ">
          {/* Slider Section */}
          <div className="relative">
            <button
              onClick={goToPrev}
              className="absolute hidden lg:block top-1/2 -left-12 -translate-y-1/2 z-10 p-4 hover:opacity-75 transition-opacity bg-black text-white rounded-full"
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
              className="blog-slider pt-[40px] lg:pt-0"
            >
              {blogPosts.map((post, index) => (
                <div
                  key={index}
                  className=" bg-gray-100 relative flex flex-col  pe-[20px] lg:pe-0 h-full "
                >
                  <div className="relative h-full">
                    <div className="relative h-[160px] lg:h-[320px]">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="relative w-full">
                      <div className="bg-white p-4 lg:p-[28px] !pb-[48px]  h-[222px] lg:h-full   ">
                        <div className="flex flex-col gap-5 justify-between h-full ">
                          <div className="flex flex-col gap-3">
                            <span className="text-base font-medium text-primary leading-[22.4px] uppercase tracking-wider">
                              {post.category} • {post.stats}
                            </span>
                            <h3 className=" text-[28px]  lg:text-[40px] font-medium leading-[35px] lg:leading-[50px] text-black   uppercase ">
                              {post.title}
                            </h3>
                          </div>
                          <Button
                            href="/"
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
              ))}
            </Slider>

            <button
              onClick={goToNext}
              className="absolute hidden lg:block top-1/2 -right-12 -translate-y-1/2 z-10 p-4 hover:opacity-75 transition-opacity bg-black text-white rounded-full"
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

          {/* Progress Bar */}
          <div className="relative w-full h-[2px] bg-black/20">
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
