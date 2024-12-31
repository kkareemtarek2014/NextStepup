"use client";
import Image from "next/image";

interface ImageFormat {
  url: string;
  width: number;
  height: number;
}

interface ImageData {
  url: string;
  alternativeText: string | null;
  formats?: {
    large?: ImageFormat;
    medium?: ImageFormat;
    small?: ImageFormat;
    thumbnail?: ImageFormat;
  };
}

interface FeaturedItem {
  id: number;
  Title: string;
  SubTitle: string;
  Description: string;
  Image: ImageData;
}

interface SummarySectionProps {
  featuredData?: FeaturedItem[];
}

export default function SummarySection({ featuredData }: SummarySectionProps) {
  return (
    <section className="relative h-fit bg-white">
      <div className="flex flex-col py-[40px] max-w-[1512px] mx-auto">
        {featuredData?.map((item) => (
          <div
            key={item.id}
            className="flex lg:gap-[18.71%] py-[60px] border-b border-t border-black/20 gap-[24px] mx-4 lg:mx-0 flex-col lg:flex-row lg:px-[56px]"
          >
            <div className="lg:w-[28.57%] w-full h-[200px] max-w-[240px] lg:max-w-full">
              <Image
                src={`${process.env.NEXT_PUBLIC_IMAGES_DOMAIN}${item.Image.url}`}
                alt={item.Image.alternativeText || item.SubTitle}
                fill
                className="object-cover !relative z-0"
              />
            </div>
            <div className="lg:w-[51.71%] h-fit flex flex-col gap-3 lg:gap-[59px] w-full">
              <div className="gap-3">
                <h3 className="text-[28px] lg:text-[40px] font-medium text-black leading-[35px] lg:leading-[50px]">
                  {item.Title}
                </h3>
                <h3 className="text-2xl lg:text-[28px] font-medium text-primary leading-[30px] lg:leading-[35px]">
                  {item.SubTitle}
                </h3>
              </div>
              <div className="w-full">
                <p className="text-sm lg:text-base text-black font-normal lg:font-semimedium">
                  {item.Description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
