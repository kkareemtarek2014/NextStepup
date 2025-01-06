"use client";
import Link from "next/link";
import ArrowIcon from "../../Icons/ArrowIcon";
import { useTextAnimation } from "@/app/[locale]/utils/textanimation";
import { useId } from "react";

interface TextSectionProps {
  title: string;
  description: string;
  paragraph?: string;
  bgcolor?: string;
  button?: {
    text: string;
    href: string;
  };
}

export default function TextSection({
  title,
  description,
  paragraph,
  bgcolor,
  button,
}: TextSectionProps) {
  const uniqueId = useId().replace(/:/g, "");

  // Create IDs array based on available content
  const textIds = [
    `textSection_title_${uniqueId}`,
    `textSection_desc_${uniqueId}`,
    ...(button ? [`textSection_button_${uniqueId}`] : []),
    ...(paragraph ? [`textSection_para_${uniqueId}`] : []),
  ];

  // Get the correct paragraph index
  const paragraphIndex = button ? 3 : 2;

  useTextAnimation({
    textIds,
    delay: 0.2,
    stagger: 0.03,
    buttonWithTitle: !!button,
    animationType: "word",
  });

  return (
    <section
      id="next-section"
      className={`relative h-fit lg:min-h-[330px] ${bgcolor || "bg-white"}`}
    >
      <div className="max-w-[1512px] mx-auto flex flex-col gap-[40px] lg:gap-0 lg:flex-row py-[40px] lg:px-[56px] px-4">
        <div className="lg:w-[47.29%] w-full">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-6">
              <h3
                id={textIds[0]}
                className="text-base lg:text-[28px] lg:leading-[35px] font-medium text-start text-primary"
              >
                {title}
              </h3>
              {button && (
                <Link
                  id={textIds[2]}
                  href={button.href}
                  className="border border-black rounded-[100px] transition-all duration-300 bg-white text-black hover:bg-black hover:text-white flex gap-1 py-2 px-4 items-center justify-start w-fit opacity-0"
                >
                  <span className="text-inherit text-base font-medium leading-[25px] text-start">
                    {button.text}
                  </span>
                  <ArrowIcon className="rotate-180 text-inherit h-5 w-5" />
                </Link>
              )}
            </div>
          </div>
        </div>
        <div
          className={`${
            paragraph ? "gap-3 flex flex-col" : ""
          } lg:w-[52.71%] w-full`}
        >
          <h3
            id={textIds[1]}
            className={`${
              paragraph
                ? "text-[28px] leading-[35px] "
                : "text-[28px] lg:text-[40px] leading-[35px] lg:leading-[50px] "
            } font-medium text-start text-black `}
          >
            {description}
          </h3>
          {paragraph && (
            <p
              id={textIds[paragraphIndex]}
              className="text-base lg:text-[20px] font-normal text-start text-primary leading-[30px] lg:leading-[25px] opacity-0"
            >
              {paragraph}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
