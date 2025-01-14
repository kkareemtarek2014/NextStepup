"use client";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState, useRef, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { fetchBlogList } from "@/app/[locale]/api/general";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Button from "./Button";
import ArrowIcon from "../../Icons/ArrowIcon";

interface BlogPost {
  id: number;
  title: string;
  date: string;
  image: string;
  category: string;
  description: string;
  slug: string;
}

export default function BlogSlider() {
  const sliderRef = useRef<Slider>(null);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [slidesToShow, setSlidesToShow] = useState<number>(2.1);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const params = useParams();
  const currentSlug = params.slug as string;
  const locale = params.locale as string;
  const [isStart, setIsStart] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const arrowRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchBlogList(locale);
        const transformedPosts =
          response?.data
            ?.filter((post: any) => post.slug !== currentSlug)
            ?.map((post: any) => ({
              id: post.id,
              title: post.Title,
              date: new Date(post.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
              }),
              image: `${process.env.NEXT_PUBLIC_IMAGES_DOMAIN}${
                post.Image?.formats?.medium?.url || post.Image?.url
              }`,
              category: post.Type,
              description: post.Description,
              slug: post.slug,
            })) || [];
        setBlogPosts(transformedPosts);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      }
    };

    fetchData();
  }, [currentSlug, locale]);

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

  useEffect(() => {
    if (!blogPosts.length || typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const headerElements = document.querySelectorAll(
        ".blog-section .animate-header > *"
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
            trigger: ".blog-section",
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
  }, [blogPosts]);

  useEffect(() => {
    blogPosts.forEach((_, index) => {
      const arrowEl = arrowRefs.current[index];
      if (!arrowEl) return;

      gsap.set(arrowEl, {
        x: -20,
        opacity: 0,
      });

      const parentCard = arrowEl.closest(".blog-card");
      if (!parentCard) return;

      parentCard.addEventListener("mouseenter", () => {
        gsap.to(arrowEl, {
          x: 0,
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      });

      parentCard.addEventListener("mouseleave", () => {
        gsap.to(arrowEl, {
          x: -20,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
        });
      });
    });
  }, [blogPosts]);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    beforeChange: (current: number, next: number) => {
      setCurrentSlide(next);
      setIsStart(next === 0);
      setIsEnd(next >= blogPosts.length - slidesToShow);
    },
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
          slidesToShow: 1.2,
        },
      },
    ],
    arrows: false,
    className: "blog-slider",
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
    if (currentSlide === 0) {
      return "25%";
    } else {
      const progress = (currentSlide / maxProgress) * 75 + 25;
      return `${Math.min(progress, 100)}%`;
    }
  };

  if (!blogPosts.length) return null;

  return (
    <section className="relative h-fit bg-teamColor overflow-hidden blog-section">
      <div className="max-w-[1512px] mx-auto">
        <div className="flex flex-col gap-[48px] lg:px-[56px] py-[40px]">
          <div className="animate-header flex flex-col ps-4 lg:ps-0 md:flex-row justify-start md:justify-between items-start gap-[24px] lg:gap-0 lg:items-center">
            <h3 className="text-[28px] lg:text-[64px] font-medium text-start text-black leading-[35px] lg:leading-[80px]">
              Discover our latest
            </h3>
            <Link href="/media">
              <Button className="blog-button px-5 py-3 bg-black hover:bg-black/90 duration-300 hover:px-6 transition-all  rounded-[100px] h-fit text-nowrap flex items-center justify-center gap-2"
                
                iconComponent={
                  <ArrowIcon className="arrow-icon rotate-180 h-4 w-4 lg:h-5 lg:w-5 text-white" />
                }>
              
                <span className="text-white lg:text-base font-medium leading-[25px] text-start">
                  Media Center
                </span> 
              </Button>
            </Link>
          </div>

          <div className="animate-slider relative">
            <button
              onClick={goToPrev}
              disabled={isStart}
              className={`slider-nav absolute hidden lg:block top-1/2 left-[-2rem] -translate-y-1/2 z-10 p-5 transition-all rounded-full
                ${
                  isStart
                  ? "opacity-50 cursor-not-allowed text-gray-400 bg-gray-100"
                  : "hover:opacity-90 text-black bg-white hover:bg-white shadow-2xl"
                  }`}
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
                   stroke="currentColor"
                   strokeWidth="1.5"
                />
              </svg>
            </button>

            <div className="-mx-4 lg:-mx-0">
              <div className="px-4 lg:px-0">
                <Slider ref={sliderRef} {...settings}>
                  {blogPosts.map((post, index) => (
                    <Link href={`/media/${post.slug}`} key={post.id}>
                      <div className="blog-card bg-gray-100 relative flex flex-col pe-[12px] lg:pe-0 group">
                        <div className="relative h-full">
                          <div className="relative h-[148px] lg:h-[320px] overflow-hidden">
                            <Image
                              src={post.image}
                              alt={post.title}
                              fill
                              className="object-cover transition-transform duration-300 delay-100 group-hover:scale-110"
                            />
                          </div>
                          <div className="relative w-full">
                            <div className="bg-white group-hover:bg-borderColor transition-all duration-300 p-5 lg:p-[28px] pb-[48px]">
                              <div className="flex flex-col gap-3">
                                <span className="text-base font-medium text-primary leading-[22.4px]">
                                  {post.category} - {post.date}
                                </span>
                                <h3 className="text-[28px] lg:text-[40px] font-medium leading-[35px] lg:leading-[50px] text-black text-balance">
                                  {post.title}
                                </h3>
                                <div className="flex items-center justify-between gap-4">
                                  <p className="text-base lg:text-xl font-medium text-black line-clamp-2">
                                    {post.description}
                                  </p>
                                  <div
                                    ref={(el) => {
                                      arrowRefs.current[index] = el;
                                    }}
                                    className="flex p-4 rounded-full hover:opacity-75 bg-black text-white"
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
                                        strokeWidth="1.5"
                                      />
                                    </svg>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </Slider>
              </div>
            </div>

            <button
              onClick={goToNext}
              disabled={isEnd}
              className={`slider-nav absolute hidden lg:block top-1/2 -right-4 -translate-y-1/2 z-10 p-5 transition-all rounded-full
                ${
                  isEnd
                  ? "opacity-50 cursor-not-allowed text-gray-400 bg-gray-100"
                  : "hover:opacity-90 text-black bg-white hover:bg-white shadow-2xl"
                }`}
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
                    stroke="currentColor"
                    strokeWidth="1.5"
                />
              </svg>
            </button>
          </div>

          <div className="animate-progress ">
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
