"use client";
import Image from "next/image";
import ArrowIcon from "../../Icons/ArrowIcon";
import Link from "next/link";

export default function ContactContent() {
  return (
    <section className="relative h-fit bg-borderColor pb-[40px] lg:pb-[160px]">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-0 flex flex-col gap-16">
        <div className="relative w-full h-[300px] lg:h-[500px]">
          <Image
            src={"/img/Contactus.svg"}
            alt="contact"
            fill
            className="object-cover"
          />
        </div>
        <div className="lg:ms-auto    lg:me-[100px]  ">
          <div className="flex flex-col  gap-[40px] lg:gap-[80px]  w-full lg:min-w-[700px]">
            <div className="flex flex-col gap-6">
              <h3 className="textbase  text-start text-black  font-normal lg:font-semimedium lg:text-balance">
                Are you interested in a property or have any other <br />
                inquiries, feel free to send us at:
              </h3>
              <h2 className="text-[28px] leading-[35px] text-wrap lg:text-[40px] lg:leading-[50px] font-medium text-start text-black  w-fit   lg:text-balance">
                hello@gdevelopments.com
                <div className="w-full h-[3px] bg-black"></div>
              </h2>
            </div>
            <div className="flex flex-col lg:flex-row  gap-[40px]  lg:gap-[5.71%] w-full">
              <div className="w-full lg:w-[47.14%] flex flex-col gap-6 ">
                <h3 className="font-normal lg:font-semimedium text-base text-black">
                  Main Office
                </h3>
                <div className="flex flex-col ">
                  <h4 className="text-base font-medium text-black">
                    B1, Cairo Business District{" "}
                  </h4>
                  <h5 className="text-base font-medium text-black">
                    New Cairo, Egypt
                  </h5>
                </div>
                <button className="border border-black rounded-[100px]   hover:bg-black hover:!text-white text-black  transition-all duration-300 bg-transparent  flex gap-1 py-2 px-4 items-center justify-start w-fit">
                  <span className="text-inherit text-base font-medium leading-[25px] text-start">
                    Get directions
                  </span>
                  <ArrowIcon className="rotate-180 text-in h-5 w-5" />
                </button>
              </div>
              <div className="w-full lg:w-[47.14%] flex flex-col gap-6 ">
                <h3 className="font-normal lg:font-semimedium text-base text-black">
                  North Coast Sales Office{" "}
                </h3>
                <div className="flex flex-col ">
                  <h4 className="text-base font-medium text-black    ">
                    Seashell Ras El Hekma,{" "}
                  </h4>
                  <h5 className="text-base font-medium text-black ">
                    North Coast, Egypt{" "}
                  </h5>
                </div>
                <button className="border border-black rounded-[100px]   hover:bg-black hover:!text-white text-black  transition-all duration-300 bg-transparent  flex gap-1 py-2 px-4 items-center justify-start w-fit">
                  <span className="text-inherit text-base font-medium leading-[25px] text-start">
                    Get directions
                  </span>
                  <ArrowIcon className="rotate-180 text-in h-5 w-5" />
                </button>
              </div>{" "}
            </div>
            <div className="w-full  max-w-[246px] flex flex-col gap-6 ">
              <h3 className="font-normal lg:font-semimedium text-base text-black">
                Follow Us
              </h3>
              <div className="flex flex-col gap-[9px] w-fit">
                <Link
                  href={"/"}
                  className="text-base font-medium text-black group relative w-fit"
                >
                  Instagram
                  <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-black transition-all duration-300 group-hover:w-full" />
                </Link>
                <Link
                  href={"/"}
                  className="text-base font-medium text-black group relative  w-fit"
                >
                  Linkedin
                  <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-black transition-all duration-300 group-hover:w-full" />
                </Link>{" "}
                <Link
                  href={"/"}
                  className="text-base font-medium text-black group relative w-fit"
                >
                  Facebook
                  <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-black transition-all duration-300 group-hover:w-full" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
