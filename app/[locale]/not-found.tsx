"use client";
import { useLocale } from "next-intl";
import { Link } from "@/navigation";
import Button from "./_components/UI/General/Button";
import ArrowIcon from "./_components/Icons/ArrowIcon";
import GetintouchSection from "./_components/UI/General/GetintouchSection";

export default function NotFound() {
  const locale = useLocale();

  return (
    <div className="relative  bg-white">
      <div className=" 2xl:container mx-auto px-5 flex flex-col gap-[20px] lg:gap-[40px] pt-[80px] pb-[100px] lg:pb-[200px] mt-[120px] items-center justify-center text-center md:w-[800px]   w-full">
        <div className="flex flex-col gap-3">
          <h1 className="text-[40px] leading-[50px] lg:text-[64px] font-medium  lg:leading-[80px] text-center text-black">
            Four, Oh! Four.
          </h1>
          <h2 className="text-[18px] md:text-[28px] lg:text-[28px] text-black  md:leading-[35px] leading-[31.2px] font-medium lg:leading-[105.6px]">
            {locale === "en"
              ? "Sorry, can't find the page you're looking for."
              : "لقد وجدت صفحة غير موجودة"}
          </h2>
        </div>

        <Button
          href={`/${locale}`}
          className="px-5 py-3 bg-black hover:bg-black/70 transition-all duration-300 rounded-[100px] h-fit text-nowrap flex items-center justify-center gap-2 !w-fit"
          iconComponent={
            <ArrowIcon className="rotate-180 h-4 w-4 lg:h-5 lg:w-5 text-white" />
          }
        >
          <span className="text-white text-sm lg:text-base font-medium leading-[25px] text-start">
            Go to Homepage
          </span>
        </Button>
      </div>
      <div className="relative lg:hidden">
        <GetintouchSection />
      </div>
    </div>
  );
}
