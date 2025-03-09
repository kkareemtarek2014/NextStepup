export const runtime = "edge";
import Image from "next/image";
import Link from "next/link";

export default function Homepage({
  locale,
  data,
}: {
  locale?: string;
  data?: any;
}) {
  return (
    <div className="bg-[#F4FAFD] w-full h-fit mt-[150px]">
      <div className="flex flex-col gap-4 items-center text-center max-w-[714px] w-full mx-auto">
        <h2 className="text-[#17204A] text-base font-bold">
          Resources & Documents
        </h2>
        <h1 className=" text-xl lg:text-[56px] 3xl:text-[100px] font-semibold leading-[120%] text-[#17204A]">
          {" "}
          Empowering You with{" "}
          <span className="ext-[56px] font-semibold leading-[120%] text-[#1D99D5]">
            Resources
          </span>
        </h1>
        <p className="font-medium text-sm sm:text-2xl md:text-4xl lg:text-base text-[#4A4B50] max-w-[630px] w-fit">
          Access our certifications, programs, and essential materials that
          showcase our commitment to excellence and innovation.
        </p>
      </div>

      <div className="grid grid-cols-3 max-w-[1176px] gap-[18px] mx-auto">
        <div className="bg-white rounded-[20px] p-6  flex flex-col gap-[32px]">
          <div className=" rounded py-[2px] px-3 bg-newcyan text-base leading-[130%] font-semibold text-[#1D99D5] w-fit">
            {" "}
            Brochure
          </div>
          <div></div>
        </div>{" "}
        <div className="bg-white rounded-[20px] p-6  flex flex-col gap-[32px]">
          <div className=" rounded py-[2px] px-3 bg-newcyan text-base leading-[130%] font-semibold text-[#1D99D5] w-fit">
            {" "}
            Brochure
          </div>

          <div className="flex flex-col gap-4">
            <Image
              src="/icons/Download.webp"
              alt="Logo"
              width={36.7}
              height={46.8900260925293}
              className="w-[36.696163177490234px] h-[46.89px]"
            />
            <div className="flex justify-between gap-1 ">
              <div className="flex flex-col text-base font-semibold leading-[130%] text-[#28347E]">
                <h2>GCF Non Return Valve</h2>
                <h2>( Swing type) Series 5300</h2>
              </div>
              <Link
                href={"https://www.orimi.com/pdf-test.pdf"}
                prefetch={false}
                className="bg-[#D2EBF7] hover:bg-[#1D99D5] rounded-full p-[11px] flex items-center"
              >
                <Image
                  src="/icons/download.svg"
                  alt="Logo"
                  width={19.47614288330078}
                  height={19.50203514099121}
                  className="w-[19.4px] h-[19.5px]"
                />
              </Link>
            </div>
          </div>
        </div>{" "}
        <div className="bg-white rounded-[20px] p-6  flex flex-col gap-[32px]">
          <div className=" rounded py-[2px] px-3 bg-newcyan text-base leading-[130%] font-semibold text-[#1D99D5] w-fit">
            {" "}
            Brochure
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
