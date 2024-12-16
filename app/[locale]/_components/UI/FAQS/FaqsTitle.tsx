"use client";

export default function FaqsTitle() {
  return (
    <section className="relative h-[304px] md:h-[284px] bg-teamColor  lg:min-h-[284px] ">
      <div className="relative h-full w-full bg-teamColor "></div>
      <div className="absolute w-full z-[2] flex flex-col bottom-0 left-0 text-white gap-[24px] pb-[64px] lg:pb-[60px] ">
        <div className="max-w-[1400px] mx-auto w-full gap-[24px] flex flex-col justify-start items-start px-4 2xl:px-0">
          <div className="flex flex-col justify-start items-start gap-[24px]  ">
            <h1 className="md:text-[80px] text-[40px] leading-[50px] md:leading-[64px] font-medium text-black">
              Frequently Asked Questions{" "}
            </h1>{" "}
          </div>
        </div>
      </div>
    </section>
  );
}
