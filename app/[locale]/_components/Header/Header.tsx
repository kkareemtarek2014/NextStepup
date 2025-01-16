"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import LangConvertor from "../UI/General/LangConvertor";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { fetchHeaderAndFooter } from "@/app/[locale]/api/general";
import { cache } from "react";

interface HeaderProps {}

interface HeaderLink {
  id: number;
  Title: string;
  Link: string;
}

interface HeaderData {
  id: number;
  Logo?: {
    url: string;
  };
  Black_Logo?: {
    url: string;
  };
  HeaderLInks?: HeaderLink[];
  MobHeaderLinks?: HeaderLink[];
  Button?: {
    Title: string;
    Link: string;
  };
}

const getHeaderData = cache(async (locale: string) => {
  try {
    const response = await fetchHeaderAndFooter(locale);
    return response.data.Header as HeaderData;
  } catch (error) {
    console.error("Error fetching header data:", error);
    return null;
  }
});

export default function Header({}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [headerData, setHeaderData] = useState<HeaderData | null>(null);
  const pathname = usePathname();
  const locale = useLocale();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getHeaderData(locale);
      setHeaderData(data);
    };
    fetchData();
  }, [locale]);

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

  const isTransparentPage =
    pathname.includes(`/community`) ||
    pathname === `/${locale}` ||
    pathname === `/` ||
    pathname === `/${locale}/media` ||
    pathname === `/media` ||
    pathname.includes(`/about-us`);

  const isContactPage = pathname.includes(`/contact-us`);

  const logoSrc = headerData
    ? isTransparentPage
      ? headerData.Logo?.url ?? "/logo_primary.svg"
      : headerData.Black_Logo?.url ?? "/logo_black.svg"
    : isTransparentPage
    ? "/logo_primary.svg"
    : "/logo_black.svg";

  return (
    <header
      className={`top-0 left-0 right-0 z-50 ${
        isTransparentPage
          ? "fixed bg-gradient-to-b from-black/100 to-transparent"
          : "absolute"
      } ${isContactPage ? "bg-teamColor" : ""}`}
    >
      <div className="max-w-[1400px] mx-auto px-4 2xl:px-0 py-4 h-[100px] flex items-center justify-between w-full">
        <div className="flex items-center">
          <Link href={`/${locale}`} className="mr-auto">
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGES_DOMAIN}${logoSrc}`}
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
          {headerData?.HeaderLInks?.map((item) => (
            <Link
              key={item.id}
              href={`/${locale}${item.Link}`}
              className={`text-base font-medium p-2 hover:px-4 transition-all duration-300 border border-transparent ${
                isTransparentPage
                  ? "text-white hover:border-white"
                  : "text-black hover:border-black"
              } rounded-[100px]`}
            >
              <p>{item.Title}</p>
            </Link>
          ))}
          <LangConvertor isBlack={!isTransparentPage} />
          {headerData?.Button && (
            <Link
              href={`/${locale}${headerData.Button.Link}`}
              className={`text-base font-medium 
                ${
                  isTransparentPage
                    ? "text-black bg-white hover:bg-black hover:text-white"
                    : "text-white bg-black hover:bg-black/30 hover:text-black hover:px-6 transition-all duration-300"
                }  leading-[24px] px-5 py-3 rounded-[100px]`}
            >
              <p>{headerData.Button.Title}</p>
            </Link>
          )}
        </div>

        <button className="md:hidden" onClick={toggleMenu}>
          <Image
            src={isTransparentPage ? "/menu.svg" : "/img/menuBlack.svg"}
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
              src={`${process.env.NEXT_PUBLIC_IMAGES_DOMAIN}${
                headerData?.Black_Logo?.url ?? "/logo_black.svg"
              }`}
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
              {headerData?.MobHeaderLinks?.map((item) => (
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

            {headerData?.Button && (
              <Link
                href={`/${locale}${headerData.Button.Link}`}
                onClick={handleLinkClick}
                className="text-base font-medium bg-black text-white leading-[24px] px-5 py-3 rounded-[100px] text-center"
              >
                <p>{headerData.Button.Title}</p>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
