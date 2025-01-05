"use client";
import { useLocale } from "next-intl";
import Breadcrumb from "../General/Breadcrumbs";
import ArrowIcon from "../../Icons/ArrowIcon";
import Button from "../General/Button";
export default function CareerTitle({ data }: { data: any }) {
  const careerData = data.data[0];

  const locale = useLocale();

  const list = [
    {
      title: "Home",
      link: `/${locale}/`,
    },
    {
      title: "Career",
      link: `/${locale}/career`,
    },

    {
      title: careerData.Title,
    },
  ];
  return (
    <div className="flex flex-col gap-[64px]">
      <div className="flex flex-col  gap-6">
        <Breadcrumb list={list} />
        <h1 className="text-[40px] md:text-[64px] leading-[50px] md:leading-[80px] font-medium text-black">
          {careerData.Title}
        </h1>
        <Button
          href={careerData.buttonLink}
          className="px-5 py-3 bg-black hover:bg-black/70 transition-all duration-300 rounded-[100px] h-fit text-nowrap flex items-center justify-center gap-2 !w-fit"
          iconComponent={
            <ArrowIcon className="rotate-180 h-4 w-4 lg:h-5 lg:w-5 text-white" />
          }
        >
          <span className="text-white text-sm lg:text-base font-medium leading-[25px] text-start">
            {careerData.buttonTitle}
          </span>
        </Button>
      </div>
    </div>
  );
}
