"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import LangConvertor from "../UI/common/LangConvertor";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";

interface HeaderProps {}

const staticHeaderData = {
  id: 1,
  Logo: {
    url: "/logo_primary.svg",
  },
  Black_Logo: {
    url: "/logo_black.svg",
  },
  HeaderLInks: [
    { id: 1, Title: "About Us", Link: "/about-us" },
    { id: 2, Title: "Community", Link: "/community" },
    { id: 3, Title: "Media", Link: "/media" },
    { id: 4, Title: "Contact", Link: "/contact-us" },
  ],
  MobHeaderLinks: [
    { id: 1, Title: "About Us", Link: "/about-us" },
    { id: 2, Title: "Community", Link: "/community" },
    { id: 3, Title: "Media", Link: "/media" },
    { id: 4, Title: "Contact", Link: "/contact-us" },
  ],
  Button: {
    Title: "Get Started",
    Link: "/contact-us",
  },
};

export default function Header({}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const locale = useLocale();

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

  const handleLinkClick = () => {
    if (window.innerWidth < 1024) {
      setIsMenuOpen(false);
    }
    setIsMenuOpen(false);
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const isContactPage = pathname.includes(`/contact-us`);

  return (
    <header
      className={`absolute top-0 left-0 right-0 z-50 ${
        isContactPage ? "bg-teamColor" : ""
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 2xl:px-0 py-4 h-[100px] flex items-center justify-between w-full">
        <div className="flex items-center">
          <Link href={`/${locale}`} className="mr-auto">
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGES_DOMAIN}${staticHeaderData.Logo.url}`}
              alt="Logo"
              width={323.6}
              height={40}
              className={`h-[28px] w-[226.52px] lg:h-auto lg:w-auto ${
                isMenuOpen ? "hidden" : ""
              }`}
              priority
            />
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-2 lg:gap-[24px]">
          {staticHeaderData.HeaderLInks.map((item) => (
            <Link
              key={item.id}
              href={`/${locale}${item.Link}`}
              className="text-base font-medium p-2 hover:px-4 transition-all duration-300 border border-transparent text-black hover:border-black rounded-[100px]"
            >
              <p>{item.Title}</p>
            </Link>
          ))}
          <LangConvertor isBlack={true} />
          {staticHeaderData.Button && (
            <Link
              href={`/${locale}${staticHeaderData.Button.Link}`}
              className="text-base font-medium text-white bg-black hover:bg-black/30 hover:text-black hover:px-6 transition-all duration-300 leading-[24px] px-5 py-3 rounded-[100px]"
            >
              <p>{staticHeaderData.Button.Title}</p>
            </Link>
          )}
        </div>

        <button className="md:hidden" onClick={toggleMenu}>
          <Image
            src="/img/menuBlack.svg"
            alt="Menu"
            width={24}
            height={24}
            className={`relative z-[20] h-6 w-[40px] ${
              isMenuOpen ? "hidden" : ""
            }`}
          />
        </button>
      </div>

      <div
        className={`fixed top-0 left-0 w-full h-full bg-black/50 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        <div className="w-full h-full bg-menuColor bg-opacity-75 backdrop-blur-[12px]">
          <div className="p-4 flex justify-between items-center">
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGES_DOMAIN}${staticHeaderData.Black_Logo.url}`}
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

          <div className="flex flex-col px-4 h-[92vh] justify-between">
            <div className="flex flex-col">
              {staticHeaderData.MobHeaderLinks.map((item) => (
                <Link
                  key={item.id}
                  href={`/${locale}${item.Link}`}
                  onClick={handleLinkClick}
                  className="text-base font-medium py-[13px] border-b border-[#c3c0ba] justify-between flex"
                >
                  <p className="text-[20px] text-black capitalize leading-[25px] max-w-[291px] w-full font-medium">
                    {item.Title}
                  </p>
                  <Image
                    src="/arrow_black.svg"
                    alt="arrow_right"
                    width={28}
                    height={28}
                  />
                </Link>
              ))}
            </div>

            {staticHeaderData.Button && (
              <Link
                href={`/${locale}${staticHeaderData.Button.Link}`}
                onClick={handleLinkClick}
                className="text-base font-medium bg-black text-white leading-[24px] px-5 py-3 rounded-[100px] text-center"
              >
                <p>{staticHeaderData.Button.Title}</p>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
