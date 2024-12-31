"use client";
import React from "react";
import Image from "next/image";

interface ImageData {
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
}

interface Facility {
  id: number;
  Title: string;
  Image: ImageData;
}

interface AmenitieData {
  id: number;
  SubTitle: string;
  Title: string;
  FacilitiesRepeater: Facility[];
}

// Fallback static data
const staticAmenities = [
  { id: 1, image: "/img/amenities1.png", title: "High-end dining outlets" },
  { id: 2, image: "/img/amenities1.png", title: "High-end dining outlets" },
  { id: 3, image: "/img/amenities1.png", title: "High-end dining outlets" },
  { id: 4, image: "/img/amenities1.png", title: "High-end dining outlets" },
  { id: 5, image: "/img/amenities1.png", title: "High-end dining outlets" },
  { id: 6, image: "/img/amenities1.png", title: "High-end dining outlets" },
  { id: 7, image: "/img/amenities1.png", title: "High-end dining outlets" },
  { id: 8, image: "/img/amenities1.png", title: "High-end dining outlets" },
  { id: 9, image: "/img/amenities1.png", title: "High-end dining outlets" },
  { id: 10, image: "/img/amenities1.png", title: "High-end dining outlets" },
];

interface AmenityCardProps {
  image: string;
  title: string;
  isApi?: boolean;
}

const AmenityCard: React.FC<AmenityCardProps> = ({ image, title, isApi }) => (
  <div className="flex flex-col justify-start items-start gap-3 max-h-[94px] w-full h-fit">
    <Image
      src={isApi ? `${process.env.NEXT_PUBLIC_IMAGES_DOMAIN}${image}` : image}
      alt={title}
      width={60}
      height={60}
      className="object-contain h-[40px] w-[40px] md:h-[60px] md:w-[60px]"
    />
    <h3 className="text-xs lg:text-base text-black">{title}</h3>
  </div>
);

interface Props {
  amenitieData?: AmenitieData;
}

export default function AmenitieSection({ amenitieData }: Props) {
  const renderAmenities = () => {
    if (amenitieData?.FacilitiesRepeater) {
      return amenitieData.FacilitiesRepeater.map((facility) => (
        <AmenityCard
          key={facility.id}
          image={facility.Image.url}
          title={facility.Title}
          isApi={true}
        />
      ));
    }

    return staticAmenities.map((amenity) => (
      <AmenityCard
        key={amenity.id}
        image={amenity.image}
        title={amenity.title}
        isApi={false}
      />
    ));
  };

  return (
    <section className="bg-white">
      <div className="max-w-[1400px] mx-auto py-[40px] px-4 xl:px-0 lg:py-[100px] flex flex-col gap-[40px] lg:gap-[60px]">
        <div className="max-w-[726px] w-fit flex flex-col justify-start items-start gap-3">
          <h3 className="text-xs tracking-[0.2em] text-black uppercase">
            {amenitieData?.SubTitle || "Amenities & Facilities"}
          </h3>
          <h5 className="text-balance text-[28px] leading-[35px] lg:text-[40px] font-medium text-black lg:leading-[50px]">
            {amenitieData?.Title ||
              "Discover Exciting Features at Seashell Ras El Hekma"}
          </h5>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 w-full">
          {renderAmenities()}
        </div>
      </div>
    </section>
  );
}
