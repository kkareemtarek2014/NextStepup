"use client";
import Image from "next/image";

export default function SummarySection() {
  return (
    <section className="relative h-fit  bg-white ">
      <div className="flex flex-col py-[40px] max-w-[1512px] mx-auto">
        <div className="flex  lg:gap-[18.71%] py-[60px] border-t border-b border-black/20 gap-[24px] mx-4 lg:mx-0  flex-col lg:flex-row lg:px-[56px]">
          <div className="lg:w-[28.57%] w-full h-[200px] max-w-[240px] lg:max-w-full">
            <Image
              src="/img/summary.svg"
              alt="summary"
              fill
              className="object-cover !relative z-0"
            />
          </div>
          <div className="lg:w-[51.71%] h-fit flex flex-col gap-3 lg:gap-[59px] w-full">
            <div className="gap-3">
              <h3 className="text-[28px] lg:text-[40px] font-medium text-black leading-[35px] lg:leading-[50px]">
                9,588,112
              </h3>
              <h3 className="text-2xl lg:text-[28px] font-medium text-primary leading-[30px] lg:leading-[35px]">
                Total landbank
              </h3>
            </div>
            <div className="w-full">
              <p className="text-sm lg:text-base text-black font-semimedium">
                Our landbank is strategically located in the heart of Egypt,
                offering unparalleled potential for growth and development.
              </p>
            </div>
          </div>
        </div>{" "}
        <div className="flex  lg:gap-[18.71%] py-[60px] border-t border-b border-black/20 gap-[24px] mx-4 lg:mx-0 flex-col lg:flex-row lg:px-[56px]">
          <div className="lg:w-[28.57%] w-full h-[200px] max-w-[240px] lg:max-w-full">
            <Image
              src="/img/summary.svg"
              alt="summary"
              fill
              className="object-cover !relative z-0"
            />
          </div>
          <div className="lg:w-[51.71%] h-fit flex flex-col gap-3 lg:gap-[59px] w-full">
            <div className="gap-3">
              <h3 className="text-[28px] lg:text-[40px] font-medium text-black leading-[35px] lg:leading-[50px]">
                8{" "}
              </h3>
              <h3 className="text-2xl lg:text-[28px] font-medium text-primary leading-[30px] lg:leading-[35px]">
                Projects{" "}
              </h3>
            </div>
            <div className="w-full">
              <p className="text-sm lg:text-base text-black font-semimedium">
                Our landbank is strategically located in the heart of Egypt,
                offering unparalleled potential for growth and development.
              </p>
            </div>
          </div>
        </div>{" "}
        <div className="flex  lg:gap-[18.71%] py-[60px] border-t border-b border-black/20 gap-[24px] mx-4 lg:mx-0 flex-col lg:flex-row lg:px-[56px]">
          <div className="lg:w-[28.57%] w-full h-[200px] max-w-[240px] lg:max-w-full">
            <Image
              src="/img/summary.svg"
              alt="summary"
              fill
              className="object-cover !relative z-0"
            />
          </div>
          <div className="lg:w-[51.71%] h-fit flex flex-col gap-3 lg:gap-[59px] w-full">
            <div className="gap-3">
              <h3 className="text-[28px] lg:text-[40px] font-medium text-black leading-[35px] lg:leading-[50px]">
                60{" "}
              </h3>
              <h3 className="text-2xl lg:text-[28px] font-medium text-primary leading-[30px] lg:leading-[35px]">
                Years of operation{" "}
              </h3>
            </div>
            <div className="w-full">
              <p className="text-sm lg:text-base text-black font-semimedium">
                Our landbank is strategically located in the heart of Egypt,
                offering unparalleled potential for growth and development.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
