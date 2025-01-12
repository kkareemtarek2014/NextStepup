"use client";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState, useRef, useEffect } from "react";
import ArrowIcon from "../../Icons/ArrowIcon";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

interface ImageFormat {
  url: string;
  width: number;
  height: number;
}

interface GalleryImage {
  id: number;
  Image: {
    url: string;
    alternativeText: string;
    formats?: {
      large?: ImageFormat;
      medium?: ImageFormat;
      small?: ImageFormat;
    };
  };
}

interface GallerySection {
  SubTitle: string;
  Title: string;
  ImageSlider: GalleryImage[];
}

// Fallback static data
const staticGalleryItems = [
  { id: 1, image: "/img/gallary2.svg" },
  { id: 2, image: "/img/gallary1.svg" },
  { id: 3, image: "/img/gallary4.png" },
  { id: 4, image: "/img/gallary1.svg" },
];

interface Props {
  mobile?: boolean;
  galleryData?: GallerySection;
}

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function GallerySlider({ mobile, galleryData }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const sliderRef = useRef<Slider>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState<number>(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 20%",
          toggleActions: "play none none none",
        },
      });

      tl.from(subtitleRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power3.out",
      })
        .from(
          titleRef.current,
          {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.4"
        )
        .from(
          controlsRef.current,
          {
            opacity: 0,
            x: -20,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.4"
        )
        .from(
          ".slide-container",
          {
            opacity: 0,
            x: 100,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
          },
          "-=0.4"
        );
    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2.08,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0px",
    responsive: [
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2.3,
          centerMode: true,

          centerPadding: "0px",
        },
      },
    ],
    beforeChange: (_: number, next: number) => setActiveSlide(next),
    arrows: false,
  };

  const goToNext = () => {
    sliderRef.current?.slickNext();
  };

  const goToPrev = () => {
    sliderRef.current?.slickPrev();
  };

  const renderGalleryItems = () => {
    if (galleryData?.ImageSlider) {
      return galleryData.ImageSlider.map((item, index) => (
        <div key={item.id} className="slide-container">
          <div
            className={`image-wrapper transition-all duration-500 ease-out ${
              activeSlide === index
                ? "h-[162.38px] md:h-[400px] lg:h-[600px]"
                : "h-[108.25px] md:h-[300px] lg:h-[400px]"
            }`}
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGES_DOMAIN}${item.Image.url}`}
              alt={item.Image.alternativeText || `Gallery image ${item.id}`}
              fill
              className="object-cover"
              priority={index === activeSlide}
            />
          </div>
        </div>
      ));
    }

    return staticGalleryItems.map((item, index) => (
      <div key={item.id} className="slide-container">
        <div
          className={`image-wrapper transition-all ease-linear ${
            activeSlide === index
              ? "h-[162.38px] md:h-[400px] lg:h-[600px]"
              : "h-[108.25px] md:h-[300px] lg:h-[400px]"
          }`}
        >
          <Image
            src={item.image}
            alt={`Gallery image ${item.id}`}
            fill
            className="object-cover"
            priority={index === activeSlide}
          />
        </div>
      </div>
    ));
  };

  return (
    <section
      ref={sectionRef}
      className={`relative ${
        mobile ? "block" : "hidden"
      } lg:block bg-white pb-[40px] lg:pb-[90px]`}
    >
      <div className="max-w-[1512px] mx-auto">
        <div className="relative lg:min-h-[664px] h-full">
          <div className="w-[362px] flex flex-col gap-3 ps-4 lg:pt-[55px] lg:pl-[56px] z-10 relative">
            <h4
              ref={subtitleRef}
              className="text-black text-xs uppercase tracking-wider"
            >
              {galleryData?.SubTitle || "Gallery"}
            </h4>
            <h2
              ref={titleRef}
              className="text-[28px] lg:text-[40px] leading-[38px] lg:leading-[50px] font-medium text-black"
            >
              {galleryData?.Title || "Life at\nG Developments"}
            </h2>
            <div ref={controlsRef} className="flex gap-3 lg:gap-4 lg:mt-4">
              <button
                onClick={goToPrev}
                className=" p-2 lg:p-4 hover:opacity-75 transition-opacity bg-black text-white rounded-full"
                aria-label="Previous slide"
              >
                <ArrowIcon className="lg:w-6 lg:h-6 w-5 h-5" />
              </button>
              <button
                onClick={goToNext}
                className="p-2 lg:p-4 hover:opacity-75 transition-opacity bg-black text-white rounded-full"
                aria-label="Next slide"
              >
                <ArrowIcon className="lg:w-6 lg:h-6 w-5 h-5 rotate-180" />
              </button>
            </div>
          </div>
          <div className="lg:absolute lg:top-[88px] left-0 w-full h-fit lg:h-[600px] overflow-hidden">
            <Slider ref={sliderRef} {...settings} className="gallery-slider">
              {renderGalleryItems()}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
}
