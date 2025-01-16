"use client";
import Image from "next/image";
import Link from "next/link";
import ArrowDownIcon from "../Icons/ArrowDownIcon";
import { useLocale } from "next-intl";
import { useRef, useEffect, useState, cache } from "react";
import gsap from "gsap";
import { fetchHeaderAndFooter } from "../../api/general";

interface FooterData {
  id: number;
  TopFooterLinks: Array<{
    id: number;
    Title: string;
    Link: string;
  }>;
}

interface ApiResponse {
  data: {
    Footer: FooterData;
    SocialMedia: Array<{
      id: number;
      Title: string;
      Link: string;
    }>;
    ContactInfo: {
      id: number;
      Email: string;
      Phone: string;
    };
    BottomFooter: Array<{
      id: number;
      Title: string;
      Link: string;
    }>;
  };
}

export default function Footer() {
  const [footerData, setFooterData] = useState<ApiResponse | null>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const locale = useLocale();

  useEffect(() => {
    const fetchData = cache(async () => {
      try {
        const response = await fetchHeaderAndFooter(locale);
        //@ts-ignore
        setFooterData(response);
      } catch (error) {
        console.error("Error fetching footer data:", error);
      }
    });
    fetchData();
  }, [locale]);

  useEffect(() => {
    const arrow = arrowRef.current;
    if (!arrow) return;

    const hoverAnimation = gsap.to(arrow, {
      y: -10,
      duration: 0.4,
      ease: "power2.out",
      paused: true,
    });

    const onHover = () => hoverAnimation.play();
    const onLeave = () => hoverAnimation.reverse();

    arrow.addEventListener("mouseenter", onHover);
    arrow.addEventListener("mouseleave", onLeave);

    return () => {
      arrow.removeEventListener("mouseenter", onHover);
      arrow.removeEventListener("mouseleave", onLeave);
      hoverAnimation.kill();
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="block top-0 left-0 right-0 z-50 w-full bg-black">
      <div className="max-w-[1400px] mx-auto px-4 py-4 flex flex-col">
        <div className="flex flex-row justify-between py-[24px]">
          <div className="flex flex-col md:flex-row gap-[9px] md:gap-[40px] mb-4 md:mb-0">
            {footerData?.data.Footer.TopFooterLinks.map((link) => (
              <Link
                key={link.id}
                href={`/${locale}${link.Link}`}
                className="text-base font-medium text-white transition-all duration-300 relative group"
              >
                <p>{link.Title}</p>
                <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>
          <button
            onClick={scrollToTop}
            className="flex items-start justify-start lg:items-center lg:justify-center  transition-all"
          >
            <div ref={arrowRef}>
              <ArrowDownIcon className="block w-[32px] h-[32px] rotate-180" />
            </div>
          </button>
        </div>
        <div className="flex flex-col-reverse border-t border-white md:border-t-0 md:flex-row items-center pt-[40px] pb-[20px] md:justify-between">
          <Link
            href={`/${locale}`}
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
                <div className="flex gap-1 items-center group">
                  <Link
                    href={`/${locale}/contact-us`}
                    className="text-base font-medium text-white relative "
                  >
                    Submit Your Interest
                    <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
                  </Link>
                  <ArrowDownIcon className="w-[20px] h-[20px] -rotate-90 group-hover:ms-2 transition-all duration-300" />
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-between lg:justify-start">
              <div className="flex flex-col gap-[20px] w-fit lg:min-w-[200px] mb-4 sm:mb-0">
                <h3 className="text-sm font-medium text-white opacity-50 uppercase tracking-widest">
                  Social
                </h3>
                <div className="flex flex-col gap-2">
                  {footerData?.data.SocialMedia.map((social) => (
                    <Link
                      key={social.id}
                      href={social.Link}
                      className="text-base font-medium text-white hover:text-gray-400 transition-all duration-300"
                    >
                      {social.Title}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-[20px] w-fit lg:min-w-[200px] sm:ml-[20px]">
                <h3 className="text-sm font-medium text-white opacity-50 uppercase tracking-widest">
                  Contact Info
                </h3>
                <div className="flex flex-col gap-2">
                  <h4 className="text-base font-medium text-white">
                    {footerData?.data.ContactInfo.Email}
                  </h4>
                  <h4 className="text-base font-medium text-white">
                    {footerData?.data.ContactInfo.Phone}
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6 lg:flex-row justify-between lg:py-[20px]">
          <div className="flex flex-col-reverse lg:flex-row gap-2 lg:gap-[40px]">
            <h4 className="text-sm font-[325] text-white opacity-50">
              © 2024 G Developments. All rights reserved.
            </h4>
            <div className="flex flex-row gap-3 lg:gap-[40px]">
              {footerData?.data.BottomFooter.map((item) => (
                <Link
                  key={item.id}
                  href={`/${locale}${item.Link}`}
                  className="relative group"
                >
                  <h5 className="text-sm font-[325] text-white hover:text-white transition-all duration-300">
                    {item.Title}
                  </h5>
                  <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </div>
          </div>
          <Link
            href="https://mitchdesigns.com"
            target="_blank"
            className="text-sm font-[325] text-white relative group flex flex-row gap-1 items-center"
          >
            Website Design and Development by{" "}
            <span className="relative">
              Mitch Designs{" "}
              <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
            </span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
