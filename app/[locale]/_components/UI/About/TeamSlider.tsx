"use client";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

interface ImageData {
  url: string;
  alternativeText: string | null;
  formats?: {
    small?: {
      url: string;
    };
    thumbnail?: {
      url: string;
    };
  };
}

interface TeamMember {
  id: number;
  Name: string;
  Position: string;
  Image: ImageData;
}

interface TeamSliderProps {
  teamMembers?: TeamMember[];
}

export default function TeamSlider({ teamMembers = [] }: TeamSliderProps) {
  const sliderRef = useRef<Slider>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [slidesToShow, setSlidesToShow] = useState<number>(2.83);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 640) {
        setSlidesToShow(1);
      } else if (window.innerWidth <= 1024) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(2.83);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.set(".team-member", {
        opacity: 0,
        y: 100,
      });

      gsap.set(".member-info", {
        opacity: 0,
        y: 30,
      });

      gsap.set(".slider-controls", {
        opacity: 0,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 20%",
          toggleActions: "play none none none",
        },
      });

      tl.to(".team-member", {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: {
          each: 0.2,
          ease: "power3.out",
        },
      })
        .to(
          ".member-info",
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: {
              each: 0.1,
              ease: "power2.out",
            },
          },
          "-=0.5"
        )
        .to(
          ".slider-controls",
          {
            opacity: 1,
            duration: 0.4,
            ease: "power2.out",
          },
          "-=0.3"
        );

      document.querySelectorAll(".team-member").forEach((member) => {
        const info = member.querySelector(".member-info");

        member.addEventListener("mouseenter", () => {
          gsap.to(info, {
            y: -10,
            duration: 0.3,
            ease: "power2.out",
          });
        });

        member.addEventListener("mouseleave", () => {
          gsap.to(info, {
            y: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [teamMembers]);

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
          slidesToShow: 1.1,
        },
      },
    ],
    arrows: false,
  };

  const goToNext = () => {
    sliderRef.current?.slickNext();
  };

  const goToPrev = () => {
    sliderRef.current?.slickPrev();
  };

  const calculateProgress = () => {
    const totalSlides = teamMembers.length;
    const maxProgress = totalSlides - slidesToShow;
    if (currentSlide === 0) {
      return "25%";
    } else {
      const progress = (currentSlide / maxProgress) * 75 + 25;
      return `${Math.min(progress, 100)}%`;
    }
  };
  const progressWidth = calculateProgress();

  return (
    <section
      ref={sectionRef}
      className="relative h-fit bg-white overflow-hidden"
    >
      <div className="max-w-[1512px] mx-auto">
        <div className="relative">
          <div className="-mx-4 lg:-mx-0">
            <div className="flex flex-col gap-[48px] px-4 lg:px-[56px] py-[40px]">
              <button
                onClick={goToPrev}
                className="slider-controls absolute hidden lg:block top-1/2 left-16 -translate-y-1/2 z-10 p-2 hover:opacity-75 transition-opacity bg-black text-white rounded-full"
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

              <Slider ref={sliderRef} {...settings} className="team-slider">
                {teamMembers.map((member) => (
                  <div key={member.id} className="team-member">
                    <div className="h-[517px] bg-teamColor relative">
                      <div className="member-image relative w-full h-full">
                        <Image
                          src={`${process.env.NEXT_PUBLIC_IMAGES_DOMAIN}${member.Image.url}`}
                          alt={member.Image.alternativeText || member.Name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="member-info absolute bottom-[20px] left-[13px] lg:left-[18px] w-[92%] mx-auto h-[143px] bg-white">
                        <div className="w-full flex gap-3 p-[28px] flex-col text-start">
                          <h3 className="text-[28px] lg:text-[40px] font-medium leading-[35px] lg:leading-[50px] text-black">
                            {member.Name}
                          </h3>
                          <p className="text-[20px] leading-[25px] font-medium text-black">
                            {member.Position}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>

              <button
                onClick={goToNext}
                className="slider-controls absolute hidden lg:block top-1/2 right-12 -translate-y-1/2 z-10 p-2 hover:opacity-75 transition-opacity bg-black text-white rounded-full"
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
            <div className="px-4 lg:px-0 mx-4 lg:ml-[56px] lg:mr-[56px]">
              <div className="relative w-full h-[2px] bg-black/20 max-w-[1512px] mx-auto">
                <div
                  className="absolute h-full bg-black transition-all duration-300 ease-in-out"
                  style={{ width: progressWidth }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
