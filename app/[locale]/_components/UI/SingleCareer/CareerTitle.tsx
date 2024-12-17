"use client";
import { useLocale } from "next-intl";
import Breadcrumb from "../General/Breadcrumbs";
import ArrowIcon from "../../Icons/ArrowIcon";
import Button from "../General/Button";
export default function CareerTitle() {
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
      title: "Site Engineer",
    },
  ];
  return (
    <div className="flex flex-col gap-[64px]">
      <div className="flex flex-col  gap-6">
        <Breadcrumb list={list} />
        <h2 className="text-[40px] md:text-[64px] leading-[50px] md:leading-[80px] font-medium text-black">
          Site Engineer{" "}
        </h2>
        <Button
          href={`/${locale}`}
          className="px-5 py-3 bg-black hover:bg-black/70 transition-all duration-300 rounded-[100px] h-fit text-nowrap flex items-center justify-center gap-2 !w-fit"
          iconComponent={
            <ArrowIcon className="rotate-180 h-4 w-4 lg:h-5 lg:w-5 text-white" />
          }
        >
          <span className="text-white text-sm lg:text-base font-medium leading-[25px] text-start">
            Apply Now
          </span>
        </Button>
      </div>
    </div>
  );
}
