"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import LangConvertor from "../UI/General/LangConvertor";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";

interface HeaderProps {}

export default function Header({}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const handleLinkClick = () => {
    if (window.innerWidth < 1024) {
      setIsMenuOpen(false);
    }
    setIsMenuOpen(false);
  };
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);
  const locale = useLocale();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const isTransparentPage =
    pathname.includes(`/community`) ||
    pathname === `/${locale}` ||
    pathname === `/` ||
    pathname === `/${locale}/media` ||
    pathname === `/media` ||
    pathname.includes(`/about-us`);

  const isContactPage = pathname.includes(`/contact-us`);
  return (
    <header
      className={` top-0 left-0 right-0 z-50    ${
        isTransparentPage
          ? " fixed bg-gradient-to-b from-black/100 to-transparent"
          : "absolute"
      } ${isContactPage ? "bg-teamColor" : ""}`}
    >
      <div className="max-w-[1400px] mx-auto px-4 2xl:px-0 py-4 h-[100px] flex items-center justify-between w-full">
        <div className="flex items-center">
          {isTransparentPage ? (
            <Link href="/" className="mr-auto">
              <Image
                src="/logo_primary.svg"
                alt="Logo"
                width={323.6}
                height={40}
                className={`h-[28px] w-[226.52px] lg:h-auto lg:w-auto ${
                  isMenuOpen ? "hidden" : ""
                }`}
                priority
              />
            </Link>
          ) : (
            <Link href="/" className="mr-auto">
              <Image
                src="/logo_black.svg"
                alt="Logo"
                width={226.52}
                height={28}
                className={`h-[28px] w-[226.52px] lg:h-auto lg:w-auto ${
                  isMenuOpen ? "hidden" : ""
                }`}
                priority
              />
            </Link>
          )}
        </div>

        <div className="hidden md:flex items-center gap-2 lg:gap-[24px]">
          <Link
            href="/community"
            className={`text-base font-medium p-2 hover:px-4 transition-all duration-300 border border-transparent ${
              isTransparentPage
                ? "text-white hover:border-white"
                : "text-black hover:border-black"
            } rounded-[100px]`}
          >
            <p>Our Communities</p>
          </Link>
          <Link
            href="/media"
            className={`text-base font-medium p-2  hover:px-4 transition-all duration-300 border border-transparent   ${
              isTransparentPage
                ? "text-white hover:border-white"
                : "text-black hover:border-black"
            } rounded-[100px]`}
          >
            <p>Latest Updates</p>
          </Link>
          <LangConvertor isBlack={!isTransparentPage} />
          <Link
            href="/contact-us"
            className={`text-base font-medium 
                ${
                  isTransparentPage
                    ? "text-black bg-white hover:bg-black hover:text-white"
                    : "text-white bg-black hover:bg-black/30 hover:text-black hover:px-6 transition-all duration-300"
                }  leading-[24px] px-5 py-3 rounded-[100px]`}
          >
            <p>Get In Touch</p>
          </Link>
        </div>

        <button className="md:hidden" onClick={toggleMenu}>
          {isTransparentPage ? (
            <Image
              src="/menu.svg"
              alt="Menu"
              width={24}
              height={24}
              className={`relative z-[20] h-6 w-[40px] ${
                isMenuOpen ? "hidden" : ""
              }`}
            />
          ) : (
            <Image
              src="/img/menuBlack.svg"
              alt="Menu"
              width={24}
              height={24}
              className={`relative z-[20] h-6 w-[40px] ${
                isMenuOpen ? "hidden" : ""
              }`}
            />
          )}
        </button>
      </div>

      <div
        className={`fixed top-0 left-0 w-full  h-full bg-black/50 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        <div className="w-full h-full bg-menuColor bg-opacity-75 backdrop-blur-[12px]">
          <div className="p-4 flex justify-between items-center">
            <Image
              src="/logo_black.svg"
              alt="Logo"
              width={226.52}
              height={28}
              className="h-auto w-auto"
            />
            <button onClick={toggleMenu}>
              <Image
                src="/Navmenu.svg"
                alt="Close"
                width={40}
                height={24}
                className="relative z-[20] h-6 w-[40px]"
              />
            </button>
          </div>

          <div className="flex flex-col     px-4 h-[92vh] justify-between">
            <div className="flex flex-col ">
              <Link
                href="/community"
                onClick={handleLinkClick}
                className="text-base font-medium py-[13px] border-b border-[#c3c0ba] justify-between flex "
              >
                <p className="text-[20px] text-black capitalize leading-[25px] max-w-[291px] w-full font-medium">
                  Our Communities
                </p>
                <Image
                  src="/arrow_black.svg"
                  alt="arrow_right"
                  width={28}
                  height={28}
                />
              </Link>
              <Link
                href="/about-us"
                onClick={handleLinkClick}
                className="text-base font-medium py-[13px] border-b border-[#c3c0ba] justify-between flex "
              >
                <p className="text-[20px] text-black capitalize leading-[25px] max-w-[291px] w-full font-medium">
                  About{" "}
                </p>
                <Image
                  src="/arrow_black.svg"
                  alt="arrow_right"
                  width={28}
                  height={28}
                />
              </Link>{" "}
              <Link
                href="/media"
                onClick={handleLinkClick}
                className="text-base font-medium py-[13px] border-b border-[#c3c0ba] justify-between flex "
              >
                <p className="text-[20px] text-black capitalize leading-[25px] max-w-[291px] w-full font-medium">
                  Latest Updates{" "}
                </p>
                <Image
                  src="/arrow_black.svg"
                  alt="arrow_right"
                  width={28}
                  height={28}
                />
              </Link>{" "}
              <Link
                href="/career"
                onClick={handleLinkClick}
                className="text-base font-medium py-[13px] border-b border-[#c3c0ba] justify-between flex "
              >
                <p className="text-[20px] text-black capitalize leading-[25px] max-w-[291px] w-full font-medium">
                  Careers{" "}
                </p>
                <Image
                  src="/arrow_black.svg"
                  alt="arrow_right"
                  width={28}
                  height={28}
                />
              </Link>{" "}
              <Link
                href="/faqs"
                onClick={handleLinkClick}
                className="text-base font-medium py-[13px] border-b border-[#c3c0ba] justify-between flex "
              >
                <p className="text-[20px] text-black capitalize leading-[25px] max-w-[291px] w-full font-medium">
                  FAQs{" "}
                </p>
                <Image
                  src="/arrow_black.svg"
                  alt="arrow_right"
                  width={28}
                  height={28}
                />
              </Link>
            </div>

            <Link
              href="/contact-us"
              onClick={handleLinkClick}
              className="text-base font-medium bg-black text-white leading-[24px] px-5 py-3 rounded-[100px] text-center"
            >
              <p>Get In Touch</p>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
