"use client";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState, useRef, useEffect } from "react";

interface TeamMember {
  name: string;
  position: string;
  image: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Akram Ziyad",
    position: "Vice President - Strategy",
    image: "/img/team1.svg",
  },
  {
    name: "Akram Ziyad",
    position: "Vice President - Strategy",
    image: "/img/team1.svg",
  },
  {
    name: "Akram Ziyad",
    position: "Vice President - Strategy",
    image: "/img/team1.svg",
  },
  {
    name: "Akram Ziyad",
    position: "Vice President - Strategy",
    image: "/img/team1.svg",
  },
  {
    name: "Akram Ziyad",
    position: "Vice President - Strategy",
    image: "/img/team1.svg",
  },
  {
    name: "Akram Ziyad",
    position: "Vice President - Strategy",
    image: "/img/team1.svg",
  },
  {
    name: "Akram Ziyad",
    position: "Vice President - Strategy",
    image: "/img/team1.svg",
  },
  // ... add more team members
];

export default function TeamSlider() {
  const sliderRef = useRef<Slider>(null);
  const [currentSlide, setCurrentSlide] = useState<number>(1);
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
          slidesToShow: 1,
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
    if (currentSlide < 1) {
      return "25%";
    } else {
      const progress = (currentSlide / maxProgress) * 75 + 25;
      return `${Math.min(progress, 100)}%`;
    }
  };
  const progressWidth = calculateProgress();

  return (
    <section className="relative h-fit bg-white">
      <div className="max-w-[1512px] mx-auto">
        <div className="flex flex-col gap-[48px] px-4 lg:px-[56px] py-[40px]">
          <div className="relative">
            <button
              onClick={goToPrev}
              className="absolute hidden lg:block top-1/2 -left-12 -translate-y-1/2 z-10 p-2 hover:opacity-75 transition-opacity bg-black text-white rounded-full"
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
              {teamMembers.map((member, index) => (
                <div key={index} className="lg:px-2">
                  <div className="h-[517px] bg-teamColor relative">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-[20px] left-[19px] w-[92%] mx-auto h-[143px] bg-white">
                      <div className="w-full flex gap-3 p-[28px] flex-col text-start">
                        <h3 className="text-[40px] font-medium leading-[50px] text-black">
                          {member.name}
                        </h3>
                        <p className="text-[20px] leading-[25px] font-medium text-black">
                          {member.position}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>

            <button
              onClick={goToNext}
              className="absolute hidden lg:block top-1/2 -right-12 -translate-y-1/2 z-10 p-2 hover:opacity-75 transition-opacity bg-black text-white rounded-full"
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

          <div className="relative w-full h-[2px] bg-black/20">
            <div
              className="absolute h-full bg-black transition-all duration-300 ease-in-out"
              style={{ width: progressWidth }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
