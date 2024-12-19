"use client";
import Image from "next/image";
import ArrowIcon from "../../Icons/ArrowIcon";

export default function StatSection() {
  return (
    <section className="relative h-fit bg-borderColor">
      <div className="flex relative py-[40px] lg:py-[80px] max-w-[1400px] mx-auto">
        <div className="flex flex-col lg:flex-row w-full mx-4 lg:mx-0 gap-[40px] lg:gap-0">
          <div className="border-t border-primary w-full lg:w-[48.5%]">
            <div className="flex flex-col pt-[20px] lg:p-[40px] gap-6">
              <h3 className="text-sm font-medium text-black tracking-wider uppercase">
                Current Projects
              </h3>
              <div className="flex justify-between items-center gap-[10px]">
                <div className="flex flex-col w-[33%]">
                  <h2 className="text-[40px] leading-[50px] lg:text-[60px]  lg:leading-[75px] font-medium text-black">
                    6
                  </h2>
                  <h3 className="text-base font-normal lg:font-semimedium text-black leading-[22.4px]">
                    Projects
                  </h3>
                </div>{" "}
                <div className="flex flex-col w-[33%]">
                  <h2 className="text-[40px] leading-[50px] lg:text-[60px]  lg:leading-[75px] font-medium text-black">
                    4.3k
                  </h2>
                  <h3 className="text-base font-normal lg:font-semimedium text-black leading-[22.4px]">
                    Units
                  </h3>
                </div>{" "}
                <div className="flex flex-col w-[33%]">
                  <h2 className="text-[40px] leading-[50px] lg:text-[60px]  lg:leading-[75px] font-medium text-black">
                    62k
                  </h2>
                  <h3 className="text-base font-normal lg:font-semimedium text-black leading-[22.4px]">
                    Total SQM
                  </h3>
                </div>
              </div>
            </div>
          </div>

          <div className="w-[1px] bg-primary h-[80%] hidden lg:block self-center mx-[20px]"></div>

          <div className="border-t border-primary w-full lg:w-[48.5%]">
            <div className="flex flex-col pt-[20px] lg:p-[40px] gap-6">
              <h3 className="text-sm font-medium text-black tracking-wider uppercase">
                Upcoming Projects{" "}
              </h3>
              <div className="flex justify-between items-center">
                <div className="flex flex-col w-[33%]">
                  <h2 className="text-[40px] leading-[50px] lg:text-[60px]  lg:leading-[75px] font-medium text-black">
                    3
                  </h2>
                  <h3 className="text-base font-normal lg:font-semimedium text-black leading-[22.4px]">
                    Projects
                  </h3>
                </div>{" "}
                <div className="flex flex-col w-[33%]">
                  <h2 className="text-[40px] leading-[50px] lg:text-[60px]  lg:leading-[75px] font-medium text-black">
                    1.2k
                  </h2>
                  <h3 className="text-base font-normal lg:font-semimedium text-black leading-[22.4px]">
                    Units
                  </h3>
                </div>{" "}
                <div className="flex flex-col w-[33%]">
                  <h2 className="text-[40px] leading-[50px] lg:text-[60px]  lg:leading-[75px] font-medium text-black">
                    35k
                  </h2>
                  <h3 className="text-base font-normal lg:font-semimedium text-black leading-[22.4px]">
                    Total SQM
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
