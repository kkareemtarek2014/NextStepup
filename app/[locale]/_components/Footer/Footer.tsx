"use client";
import Image from "next/image";
import Link from "next/link";
import ArrowDownIcon from "../Icons/ArrowDownIcon";

interface FooterProps {
  // Add any props if needed
}

export default function Footer({}: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scroll effect
    });
  };
  return (
    <footer className="block top-0 left-0 right-0 z-50 w-full bg-black">
      <div className="max-w-[1400px] mx-auto px-4 py-4 flex flex-col">
        <div className="flex flex-row justify-between py-[24px]">
          <div className="flex flex-col md:flex-row gap-[9px] md:gap-[40px] mb-4 md:mb-0">
            <Link
              href="/about-us"
              className="text-base font-medium text-white transition-all duration-300 relative group"
            >
              <p>About us</p>
              <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link
              href="/"
              className="text-base font-medium text-white transition-all duration-300 relative group"
            >
              <p>Our Communities</p>
              <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link
              href="/media"
              className="text-base font-medium text-white transition-all duration-300 relative group"
            >
              <p>Latest Updates</p>
              <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link
              href="/career"
              className="text-base font-medium text-white transition-all duration-300 relative group"
            >
              <p>Careers</p>
              <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link
              href="/faqs"
              className="text-base font-medium text-white transition-all duration-300 relative group"
            >
              <p>FAQs</p>
              <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link
              href="/contact-us"
              className="text-base font-medium text-white transition-all duration-300 relative group"
            >
              <p>Contact us</p>
              <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
            </Link>
          </div>
          <button
            onClick={scrollToTop}
            className="flex items-start justify-start lg:items-center lg:justify-center  transition-all"
          >
            <ArrowDownIcon className="block w-[32px] h-[32px] rotate-180" />
          </button>
        </div>
        <div className="flex flex-col-reverse border-t border-white md:border-t-0 md:flex-row items-center pt-[40px] pb-[20px] md:justify-between">
          <Link
            href="/"
            className="md:mt-[166.8px] mb-8 md:mb-0 h-[42.4px] lg:h-[80px] md:h-[111.25px] w-fit sm:w-[343px] md:w-[496px] xl:w-[900px] object-contain md:pe-4 xl:pe-[80px]"
          >
            <Image
              src="/logo_primary.svg"
              alt="Logo"
              width={900}
              height={111.25}
              className=""
              priority
            />
          </Link>
          <div className="flex flex-col gap-[40px] md:gap-[60px] w-full md:w-auto">
            <div className="flex flex-col gap-[20px]">
              <h3 className="text-sm font-medium text-white opacity-50 uppercase tracking-widest">
                Interest Form
              </h3>
              <div className="flex flex-col gap-2">
                <h5 className="text-base font-medium text-white">
                  Looking for something specific?
                </h5>
                <div className="flex gap-1 items-center">
                  <h5 className="text-base font-medium text-white">
                    Submit Your Interest
                  </h5>
                  <ArrowDownIcon className="w-[20px] h-[20px] -rotate-90" />
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-between lg:justify-start">
              <div className="flex flex-col gap-[20px] w-fit lg:min-w-[200px] mb-4 sm:mb-0">
                <h3 className="text-sm font-medium text-white opacity-50 uppercase tracking-widest">
                  Social
                </h3>
                <div className="flex flex-col gap-2">
                  <h4 className="text-base font-medium text-white hover:text-gray-400 transition-all duration-300 cursor-pointer">
                    Instagram
                  </h4>
                  <h4 className="text-base font-medium text-white hover:text-gray-400 transition-all duration-300 cursor-pointer">
                    LinkedIn
                  </h4>
                  <h4 className="text-base font-medium text-white hover:text-gray-400 transition-all duration-300 cursor-pointer">
                    Facebook
                  </h4>
                </div>
              </div>
              <div className="flex flex-col gap-[20px] w-fit lg:min-w-[200px] sm:ml-[20px]">
                <h3 className="text-sm font-medium text-white opacity-50 uppercase tracking-widest">
                  Contact Info
                </h3>
                <div className="flex flex-col gap-2">
                  <h4 className="text-base font-medium text-white">
                    info@gdevelopments.com
                  </h4>
                  <h4 className="text-base font-medium text-white">16738</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex  flex-col gap-6   lg:flex-row justify-between lg:py-[20px]">
          <div className="flex flex-col-reverse   lg:flex-row gap-2 lg:gap-[40px]">
            <h4 className="text-sm font-[325] text-white opacity-50">
              © 2024 G Developments. All rights reserved.
            </h4>
            <div className=" flex-row flex gap-3 lg:gap-[40px]">
              <div className="relative group">
                <h5 className="text-sm font-[325] text-white hover:text-white transition-all duration-300 cursor-pointer">
                  Privacy
                </h5>
                <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
              </div>
              <div className="relative group">
                <h5 className="text-sm font-[325] text-white hover:text-white transition-all duration-300 cursor-pointer">
                  Terms & Conditions
                </h5>
                <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
              </div>
            </div>
          </div>
          <h4 className="text-sm font-[325] text-white">
            Website by{" "}
            <span className="relative group inline-block">
              Mitch Designs
              <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
            </span>
          </h4>
        </div>
      </div>
    </footer>
  );
}
