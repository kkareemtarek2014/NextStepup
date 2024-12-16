"use client";

export default function StatSection() {
  return (
    <section className="relative h-fit bg-white">
      <div className="flex flex-col max-w-[1472px] mx-auto py-[40px] ">
        <div className="flex justify-center items-center px-4 2xl:px-0">
          <h2 className="lg:text-[120px] text-[40px] md:text-[60px] leading-[50px] lg:leading-[150px] uppercase text-newRed font-medium text-center">
            OVER 60 YEARS
          </h2>{" "}
        </div>

        <div className="flex justify-center lg:justify-end items-end px-4 lg:pe-[30px] xl:pe-[100px]">
          <h2 className="lg:text-[120px] text-[40px] md:text-[60px] leading-[50px] md:leading-[150px] uppercase text-newRed font-medium text-center w-fit xl:text-end justify-self-end flex  relative">
            {" "}
            OF EXPERIENCE
          </h2>
        </div>
      </div>
    </section>
  );
}
