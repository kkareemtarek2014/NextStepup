"use client";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState, useRef, useEffect } from "react";

interface BlogPost {
  title: string;
  date: string;
  image: string;
  category: string;
}

const blogPosts: BlogPost[] = [
  {
    title: "G Developments launches Seashell Ras El Hekma",
    date: "May 2024",
    image: "/img/blog1.svg",
    category: "News",
  },
  {
    title: "G Developments launches Seashell Ras El Hekma",
    date: "May 2024",
    image: "/img/blog1.svg",
    category: "News",
  },
  {
    title: "G Developments launches Seashell Ras El Hekma",
    date: "May 2024",
    image: "/img/blog1.svg",
    category: "News",
  },
  {
    title: "G Developments launches Seashell Ras El Hekma",
    date: "May 2024",
    image: "/img/blog1.svg",
    category: "News",
  },
  // ... add more blog posts
];

export default function BlogSlider() {
  const sliderRef = useRef<Slider>(null);
  const [currentSlide, setCurrentSlide] = useState<number>(1);
  const [slidesToShow, setSlidesToShow] = useState<number>(2.1);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 640) {
        setSlidesToShow(1);
      } else if (window.innerWidth <= 1024) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(2.1);
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
          slidesToShow: 1.8,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1.12,
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
    <section className="relative h-fit bg-teamColor overflow-hidden">
      <div className="max-w-[1512px] mx-auto overflow-hidden">
        <div className="flex flex-col gap-[48px]  lg:px-[56px] py-[40px]">
          <div className="flex flex-col ps-4 lg:ps-0  md:flex-row justify-start md:justify-between items-start gap-[24px] lg:gap-0 lg:items-center">
            <h3 className="text-[28px] lg:text-[64px] font-medium text-start text-black leading-[35px] lg:leading-[80px]">
              Discover our latest
            </h3>
            <button className="px-5 py-3 bg-black rounded-[100px] h-fit text-nowrap flex items-center justify-center gap-2">
              <span className="text-white  lg:text-base font-medium leading-[25px] text-start">
                Media Center
              </span>
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

          {/* Slider Section */}
          <div className="relative ">
            <button
              onClick={goToPrev}
              className="absolute hidden lg:block top-1/2 -left-4 -translate-y-1/2 z-10 p-4 hover:opacity-75 transition-opacity bg-black text-white rounded-full"
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
            <div className=" -mx-4 lg:-mx-0">
              <div className=" px-4 lg:px-0">
                <Slider ref={sliderRef} {...settings} className="blog-slider">
                  {blogPosts.map((post, index) => (
                    <div
                      key={index}
                      className=" bg-gray-100 relative flex flex-col pe-[12px] lg:pe-0 "
                    >
                      <div className="relative h-full">
                        <div className="relative h-[148px] lg:h-[320px]">
                          <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="relative w-full">
                          <div className="bg-white p-5 lg:p-[28px] pb-[48px] ">
                            <div className="flex flex-col gap-3">
                              <span className="text-base font-medium text-primary leading-[22.4px]">
                                {post.category} - {post.date}
                              </span>
                              <h3 className="text-[28px] lg:text-[40px] font-medium leading-[35px] lg:leading-[50px] text-black text-balance">
                                {post.title}
                              </h3>
                              <p className="text-base lg:text-xl font-medium text-black line-clamp-2">
                                The first fully-integrated coastal resort at the
                                heart of the North Coast's Ras El Hekma.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>

            <button
              onClick={goToNext}
              className="absolute hidden lg:block top-1/2 -right-4 -translate-y-1/2 z-10 p-4 hover:opacity-75 transition-opacity bg-black text-white rounded-full"
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

          <div className="mx-4 ">
            <div className="relative w-full h-[2px] bg-black/20 max-w-[1512px] mx-auto">
              <div
                className="absolute h-full bg-black transition-all duration-300 ease-in-out"
                style={{ width: calculateProgress() }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
