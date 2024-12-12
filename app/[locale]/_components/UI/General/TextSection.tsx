"use client";
import Image from "next/image";

interface TextSectionProps {
  title: string;
  description: string;
  bgcolor?: string;
}

export default function TextSection({
  title,
  description,
  bgcolor,
}: TextSectionProps) {
  return (
    <section
      className={`relative h-fit lg:min-h-[330px] ${
        bgcolor ? bgcolor : "bg-white"
      }`}
    >
      <div className="max-w-[1512px] mx-auto flex flex-col gap-[40px] lg:gap-0 lg:flex-row py-[40px] lg:px-[56px] px-4">
        <div className="lg:w-[47.29%] w-full">
          <h3 className="text-base  lg:text-[28px] lg:leading-[35px] font-medium text-start text-primary">
            {title}
          </h3>
        </div>
        <div className="lg:w-[52.71%] w-full">
          <h3 className="text-[28px] lg:text-[40px] font-medium text-start text-black leading-[35px] lg:leading-[50px]">
            {description}
          </h3>
        </div>
      </div>
    </section>
  );
}
