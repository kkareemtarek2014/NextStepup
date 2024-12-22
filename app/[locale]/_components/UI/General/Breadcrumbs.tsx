"use client";

import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface BreadcrumbItem {
  title?: string;
  link?: string;
  pointerEvents?: boolean;
}

interface BreadcrumbProps {
  list?: BreadcrumbItem[];
  center?: boolean;
  color?: string;
}

const Breadcrumb: FC<BreadcrumbProps> = ({ list, center, color }) => {
  return (
    <div
      className={`${
        center ? "items-center justify-center" : "items-start justify-start"
      } flex flex-row `}
    >
      {list && (
        <nav
          className={`flex text-center items-center  py-[6px] md:px-0  w-auto max-w-fit bg-transparent rounded-[8px] relative z-[1] ${
            color ? color : " text-black"
          }`}
        >
          <ol className="list-reset flex text-center items-center justify-center gap-x-1 md:gap-x-[6px] flex-wrap">
            {list.map((item: BreadcrumbItem, index: number) => (
              <li key={index} className="flex items-center capitalize">
                {item.link ? (
                  <>
                    <div className="flex items-center capitalize gap-2">
                      <Link
                        href={item.link}
                        prefetch={false}
                        scroll={false}
                        className={`text-[10px] md:text-sm relative group cursor-pointer font-normal lg:font-semimedium text-inherit  ${
                          item.pointerEvents === false && "pointer-events-none"
                        }`}
                      >
                        {item.title}
                        <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-black transition-all duration-300 group-hover:w-full" />
                      </Link>
                    </div>
                    <h2
                      className={`ml-2 text-[10px] md:text-sm font-normal lg:font-semimedium  text-inherit`}
                    >
                      /{" "}
                    </h2>
                  </>
                ) : (
                  <span className=" text-inherit md:w-full items-center font-normal lg:font-semimedium text-[10px] md:text-sm  opacity-50">
                    {item.title}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      )}
    </div>
  );
};

export default Breadcrumb;
