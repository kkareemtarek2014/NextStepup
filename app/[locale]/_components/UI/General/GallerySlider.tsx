"use client";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState, useRef } from "react";
import ArrowIcon from "../../Icons/ArrowIcon";

interface GalleryItem {
  id: number;
  image: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    image: "/img/gallary2.svg",
  },
  {
    id: 2,
    image: "/img/gallary1.svg",
  },
  {
    id: 3,
    image: "/img/gallary4.png",
  },
  {
    id: 4,
    image: "/img/gallary1.svg",
  },
];

export default function GallerySlider({ mobile }: { mobile?: boolean }) {
  const sliderRef = useRef<Slider>(null);
  const [activeSlide, setActiveSlide] = useState<number>(0);

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

  return (
    <section
      className={`relative ${
        mobile ? "block" : "hidden"
      } lg:block bg-white  pt-[40px] lg:pt-20 pb-[90px]`}
    >
      <div className="max-w-[1512px] mx-auto">
        <div className="relative  lg:min-h-[664px] h-full">
          <div className="w-[362px] flex flex-col gap-3 ps-4  lg:pt-[55px] lg:pl-[56px] z-10 relative">
            <h4 className="text-black text-xs uppercase tracking-wider">
              Gallery
            </h4>
            <h2 className="text-[28px] lg:text-[40px] leading-[38px] lg:leading-[50px]  font-medium text-black">
              Life at <br />G Developments
            </h2>
            <div className="flex gap-3 lg:gap-4 lg:mt-4">
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
              {galleryItems.map((item, index) => (
                <div key={item.id} className="slide-container">
                  <div
                    className={`image-wrapper transition-all  ease-linear ${
                      activeSlide === index
                        ? "h-[162.38px] lg:h-[600px]"
                        : "h-[108.25px] lg:h-[400px]"
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
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
}
