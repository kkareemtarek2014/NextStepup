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
    <div ref={popupRef} className="relative">
      <div
        className="property-details-popup absolute right-0 w-[600px] bg-white shadow-lg z-20  me-[56px] translate-y-[15%]"
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
            className="absolute right-0 top-0 text-black p-4 z-10 bg-white hover:bg-black hover:text-white rounded-full m-4"
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
            className="relative w-full aspect-[600/300] max-w-[600px]"
          >
            <Image
              src={marker.image}
              alt={marker.name}
              className="w-full h-full object-cover"
              fill
            />
          </div>
          <div ref={contentRef} className="flex flex-col gap-4 py-4">
            <div className="flex flex-col gap-3 px-4 lg:px-7">
              <h3 className="text-[40px] leading-[50px] text-black font-medium">
                {marker.name}
              </h3>
              <p className="text-primary text-base font-medium leading-[22.4px]">
                {marker.description}
              </p>
            </div>
            <div className="flex flex-col gap-[40px] py-[17px] px-4 lg:px-7">
              <div className="flex gap-6 border-b border-borderColor py-[17px] border-t">
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
              <div className="flex gap-6">
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
              <div className="flex gap-3 justify-end">
                <a
                  href={marker.downloadButton.ButtonLink}
                  className="block w-fit text-center bg-black text-white py-3 px-5 hover:bg-white hover:text-black hover:border-black border transition-colors rounded-[100px]"
                >
                  Inquire Now
                </a>
                <a
                  href={marker.downloadButton.ButtonLink}
                  className="block w-fit text-center bg-white border border-black text-black py-3 px-5 hover:bg-black hover:text-white transition-colors rounded-[100px]"
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
    <div className="flex gap-3 w-1/3">
      <img src={icon} alt="icon" />
      <div className="flex gap-1 items-center">
        <p className="font-medium text-black">{value}</p>
        {label && <p className="text-base text-black font-medium">{label}</p>}
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
      className={`flex flex-col gap-1 w-1/3 ${
        showBorder ? "border-e border-borderColor" : ""
      }`}
    >
      <p className="text-sm text-black font-semimedium">{label}</p>
      <p className="font-medium text-black text-base">{value}</p>
    </div>
  );
}
