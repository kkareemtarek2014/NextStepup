"use client";
import React, { useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

interface ImageFormat {
  url: string;
  width: number;
  height: number;
}

interface GalleryImage {
  id: number;
  Image: {
    url: string;
    alternativeText: string | null;
    formats?: {
      large?: ImageFormat;
      medium?: ImageFormat;
      small?: ImageFormat;
    };
  };
}

interface FeatureSection {
  id: number;
  SubTitle: string;
  Title: string;
  Tagline: string;
  Description: string;
  ImageSlider: GalleryImage[];
}

// Fallback static data
const staticFeatureContent = {
  title: "Sports Club",
  subtitle: "Break a sweat or simply connect",
  description:
    "Ideal for fitness enthusiasts and leisure seekers alike, the cutting-edge sports club is an energetic hub, buzzing with recreational activities and top-class facilities of every possible type.",
  images: [
    "/img/featureImage.png",
    "/img/cummunityHeero.png",
    "/img/gallary4.png",
  ],
};

interface Props {
  featureData?: FeatureSection;
}

export default function FeatureSection({ featureData }: Props) {
  const sliderRef = useRef<Slider>(null);
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    beforeChange: (_: number, next: number) => setCurrentSlide(next),
  };

  const goToNext = () => {
    sliderRef.current?.slickNext();
  };

  const goToPrev = () => {
    sliderRef.current?.slickPrev();
  };

  const renderSlides = () => {
    if (featureData?.ImageSlider) {
      return featureData.ImageSlider.map((item) => (
        <div key={item.id} className="relative h-[375px] lg:h-[600px]">
          <Image
            src={`${process.env.NEXT_PUBLIC_IMAGES_DOMAIN}${item.Image.url}`}
            alt={item.Image.alternativeText || `Feature image ${item.id}`}
            fill
            className="object-cover"
          />
        </div>
      ));
    }

    // Fallback to static images
    return staticFeatureContent.images.map((image, index) => (
      <div key={index} className="relative h-[375px] lg:h-[600px]">
        <Image
          src={image}
          alt={`${staticFeatureContent.title} - Image ${index + 1}`}
          fill
          className="object-cover"
        />
      </div>
    ));
  };

  return (
    <section className="bg-teamColor h-fit pb-[40px] lg:p-0">
      <div className="max-w-[1512px] mx-auto">
        <div className="flex lg:flex-row flex-col-reverse gap-y-[40px]">
          {/* Static Content */}
          <div className="lg:w-1/2 w-full flex flex-col items-start justify-center gap-[40px] px-4 lg:p-10">
            <div className="flex flex-col gap-3 items-start justify-start max-w-[556px]">
              <span className="text-xs tracking-[20%] text-black uppercase">
                {featureData?.SubTitle || "Community features"}
              </span>
              <div className="flex flex-col gap-2">
                <h3 className="text-[40px] font-medium text-black leading-[50px]">
                  {featureData?.Title || staticFeatureContent.title}
                </h3>
                <p className="text-[28px] leading-[35px] text-primary font-medium">
                  {featureData?.Tagline || staticFeatureContent.subtitle}
                </p>
              </div>
              <p className="text-base text-black font-normal">
                {featureData?.Description || staticFeatureContent.description}
              </p>
            </div>

            <div className="flex gap-3 lg:gap-5">
              <button
                onClick={goToPrev}
                className="relative block p-[10px] lg:p-4 hover:opacity-75 transition-opacity bg-black text-white rounded-full"
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
              <button
                onClick={goToNext}
                className="relative block p-[10px] lg:p-4 hover:opacity-75 transition-opacity bg-black text-white rounded-full"
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
          </div>

          {/* Image Slider */}
          <div className="lg:w-1/2 w-full max-w-[716px] my-4 lg:m-5 overflow-hidden">
            <Slider
              ref={sliderRef}
              {...settings}
              className="h-[375px] lg:h-[600px]"
            >
              {renderSlides()}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
}
