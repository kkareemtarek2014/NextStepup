"use client";

const { useRouter, usePathname } = createSharedPathnamesNavigation({ locales });
import { createSharedPathnamesNavigation } from "next-intl/navigation";
import { useState, useEffect } from "react";
import { useLocale } from "next-intl";
import { locales } from "@/navigation";
import Image from "next/image";

interface LangConvProps {
  isBlack?: boolean;
}

export default function LangConv({ isBlack = false }: LangConvProps) {
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const onLocaleChange = (newLocale: any) => {
    router.replace(pathname, { locale: newLocale });
  };

  useEffect(() => {
    const checkMobileView = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobileView();

    window.addEventListener("resize", checkMobileView);

    return () => window.removeEventListener("resize", checkMobileView);
  }, []);

  const textColorClass = isBlack ? "text-black" : "text-white";
  const iconSrc = isBlack ? "/img/globe.svg" : "/img/globewhite.svg";

  return (
    <div className="flex gap-2 items-center relative md:mt-0 w-fit">
      {locale === "en" ? (
        <button
          onClick={() => onLocaleChange("ar")}
          className={`flex items-center gap-2 text-base font-medium p-2 border border-transparent ${
            isBlack ? "hover:border-black" : "hover:border-white"
          } rounded-[100px] ${textColorClass}`}
        >
          العربية <Image src={iconSrc} alt="language" width={24} height={16} />
        </button>
      ) : (
        <button
          onClick={() => onLocaleChange("en")}
          className={`flex items-center gap-2 text-base font-medium p-2 border border-transparent ${
            isBlack ? "hover:border-black" : "hover:border-white"
          } rounded-[100px] ${textColorClass}`}
        >
          English
          <Image src={iconSrc} alt="language" width={24} height={16} />
        </button>
      )}
    </div>
  );
}
