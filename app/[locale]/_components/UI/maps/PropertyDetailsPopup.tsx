"use client";

import Image from "next/image";
import { MapMarker } from "./ImagePropertyMap";
import { useEffect, useRef } from "react";
import gsap from "gsap";

interface PropertyDetailsPopupProps {
  marker: MapMarker;
  onClose: () => void;
}

export default function PropertyDetailsPopup({
  marker,
  onClose,
}: PropertyDetailsPopupProps) {
  const popupRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
    });

    gsap.set(popupRef.current, { opacity: 0, y: 100 });
    gsap.set(imageRef.current, { opacity: 0 });
    gsap.set([...(contentRef.current?.children || [])], { opacity: 0, y: 20 });

    tl.to(popupRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
    })
      .to(
        imageRef.current,
        {
          opacity: 1,
          duration: 0.5,
          ease: "power3.out",
        },
        "-=0.3"
      )
      .to(
        [...(contentRef.current?.children || [])],
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.1,
        },
        "-=0.2"
      );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div ref={popupRef} className="relative z-50">
      <div
        className="property-details-popup absolute lg:right-0 translate-y-[21%] sm:translate-y-[53%] md:translate-y-[42%]  max-h-[90vh] lg:max-h-none   mx-4 lg:mx-0 w-[calc(100%-32px)] lg:w-[600px] bg-white shadow-lg z-20  lg:me-[56px] lg:translate-y-[15%]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <button
            onClick={() => {
              gsap.to(popupRef.current, {
                opacity: 0,
                y: 100,
                duration: 0.4,
                onComplete: onClose,
              });
            }}
            className="absolute right-0 top-0 text-black p-2 lg:p-4 z-10 bg-white hover:bg-black hover:text-white rounded-full m-4"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div
            ref={imageRef}
            className="relative aspect-[343/172] w-full lg:aspect-[600/300] lg:max-w-[600px]"
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGES_DOMAIN}${marker.Image.url}`}
              alt={marker.name}
              className="w-full h-full object-cover"
              fill
            />
          </div>
          <div
            ref={contentRef}
            className="flex flex-col galg:gap-4 py-[2vh] lg:py-4"
          >
            <div className="flex flex-col gap-[1.5vh] lg:gap-3 px-[2vh] lg:px-7">
              <h3 className="text-[3vh] lg:text-[40px] leading-[4vh] lg:leading-[50px] text-black font-medium">
                {marker.name}
              </h3>
              <p className="text-primary text-sm lg:text-base font-medium  lg:leading-[22.4px]">
                {marker.Description}
              </p>
            </div>
            <div className="flex flex-col gap-[3vh] lg:gap-[40px] py-[2vh] lg:py-[17px] px-4 lg:px-7">
              <div className="flex gap-6 border-b border-borderColor py-[17px] border-t  overflow-x-auto lg:overflow-x-none">
                <PropertyDetail
                  icon="/img/IconDetails.svg"
                  value={`${marker.fromArea} - ${marker.toArea} m²`}
                />
                <PropertyDetail
                  icon="/img/IconDetails.svg"
                  value={`${marker.fromBedrooms} - ${marker.toBedrooms}`}
                  label="Bedrooms"
                />
                <PropertyDetail
                  icon="/img/IconDetails.svg"
                  value={`${marker.fromBathrooms} - ${marker.toBathrooms}`}
                  label="Bathrooms"
                />
              </div>
              <div className="flex gap-[2vh] lg:gap-6">
                <InfoColumn
                  label="Starting Price"
                  value={`EGP ${marker.price.toLocaleString()}`}
                  showBorder
                />
                <InfoColumn
                  label="Payment Plan"
                  value={marker.paymentPlan}
                  showBorder
                />
                <InfoColumn label="Delivery Date" value={marker.deliveryDate} />
              </div>
              <div className="flex gap-[1.5vh] lg:gap-3 justify-end">
                <a
                  href={marker.downloadButton.ButtonLink}
                  className="block w-fit text-center bg-black text-white text-sm lg:text-base py-[10px] lg:py-3 lg:px-5 px-4 hover:bg-white hover:text-black hover:border-black border transition-colors rounded-[100px]"
                >
                  Inquire Now
                </a>
                <a
                  href={marker.downloadButton.ButtonLink}
                  className="block w-fit text-center bg-white border text-sm lg:text-base border-black text-black py-[10px] lg:py-3 lg:px-5 px-4 hover:bg-black hover:text-white transition-colors rounded-[100px]"
                >
                  {marker.downloadButton.ButtonTitle}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface PropertyDetailProps {
  icon: string;
  value: string;
  label?: string;
}

function PropertyDetail({ icon, value, label }: PropertyDetailProps) {
  return (
    <div className="flex relative pe-3 lg:pe-0 lg:!gap-3 w-full lg:w-1/3   ">
      <img src={icon} alt="icon" />
      <div className=" relative flex gap-1 items-center whitespace-nowrap min-w-0">
        <p className="relative font-medium text-black text-sm lg:text-base shrink-0">
          {value}
        </p>
        {label && (
          <p className="text-sm lg:text-base text-black font-medium shrink-0">
            {" "}
            {label}
          </p>
        )}
      </div>
    </div>
  );
}

interface InfoColumnProps {
  label: string;
  value: string;
  showBorder?: boolean;
}

function InfoColumn({ label, value, showBorder }: InfoColumnProps) {
  return (
    <div
      className={`flex flex-col gap-[1vh] lg:gap-1 w-1/3 ${
        showBorder ? "border-e border-borderColor" : ""
      }`}
    >
      <p className="text-[10px] lg:text-sm text-black font-normal lg:font-semimedium">
        {label}
      </p>
      <p className="font-medium text-black text-sm lg:text-base">{value}</p>
    </div>
  );
}
