"use client";
import Image from "next/image";
import Button from "./Button";
import ArrowIcon from "../../Icons/ArrowIcon";

export default function GetintouchSection() {
  return (
    <section className="relative h-fit bg-borderColor">
      <div className="py-[40px] lg:py-[80px] max-w-[992px] mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row xl:gap-[100px] gap-8 items-start lg:items-center">
          <div className="w-full md:w-fit md:min-w-[736px]">
            <h3 className="text-[28px] md:text-[40px] font-medium text-start text-black leading-[35px] md:leading-[50px] lg:text-balance">
              Are you interested in a property or have any other inquiries?
            </h3>
          </div>
          <Button
            href="/contact-us"
            className="px-5 py-3 bg-black rounded-[100px] h-fit text-nowrap flex items-center justify-center gap-2 !w-fit"
            iconComponent={
              <ArrowIcon className="rotate-180 h-4 w-4 lg:h-5 lg:w-5" />
            }
          >
            <span className="text-white text-sm lg:text-base font-medium leading-[25px] text-start">
              Get in touch
            </span>
          </Button>
        </div>
      </div>
    </section>
  );
}
