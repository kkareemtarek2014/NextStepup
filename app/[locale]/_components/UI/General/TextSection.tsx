"use client";
import Image from "next/image";
import ArrowIcon from "../../Icons/ArrowIcon";

interface TextSectionProps {
  title: string;
  description: string;
  bgcolor?: string;
  button?: {
    text: string;
    href: string;
  };
}

export default function TextSection({
  title,
  description,
  bgcolor,
  button,
}: TextSectionProps) {
  return (
    <section
      className={`relative h-fit lg:min-h-[330px] ${
        bgcolor ? bgcolor : "bg-white"
      }`}
    >
      <div className="max-w-[1512px] mx-auto flex flex-col gap-[40px] lg:gap-0 lg:flex-row py-[40px] lg:px-[56px] px-4">
        <div className="lg:w-[47.29%] w-full">
          <div className="flex flex-col gap-6">
            <h3 className="text-base lg:text-[28px] lg:leading-[35px] font-medium text-start text-primary">
              {title}
            </h3>
            {button && (
              <button className="border border-black rounded-[100px] bg-white flex gap-1 py-2 px-4 items-center justify-start w-fit">
                <span className="text-black text-base font-medium leading-[25px] text-start">
                  {button.text}
                </span>
                <ArrowIcon className="rotate-180 text-black h-5 w-5" />
              </button>
            )}
          </div>
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
