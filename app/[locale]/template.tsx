"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { animatePageIn } from "./utils/animations";
import { getPageName } from "./utils/getPageName";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHomePage = pathname === "/" || pathname.endsWith("/home");
  const isCommunityPage = pathname === "/community";
  const isSingleCommunityPage = pathname.startsWith("/community/") && pathname !== "/community";
  const isMediaPage = pathname === "/media" || pathname.startsWith("/media/");

  // Only show template for home and community pages
  const showTemplate = (isHomePage || isCommunityPage || isSingleCommunityPage) && !isMediaPage;

  useEffect(() => {
    if (showTemplate) {
      animatePageIn(getPageName(pathname));
    }
  }, [pathname, showTemplate]);

  if (!showTemplate) {
    return <>{children}</>;
  }

  return (
    <div className="overflow-x-hidden">
      <div className="flex">
        <div
          id="banner-1"
          className="page-banner flex items-center justify-center"
        >
          {isHomePage ? (
            <Image
              src="/logo_primary.svg"
              alt="Logo"
              width={500}
              height={40}
              className="opacity-0 px-4 lg:px-0"
              id="banner-text"
            />
          ) : (
            <span
              id="banner-text"
              className="text-white text-4xl md:text-6xl font-medium opacity-0"
            >
              {getPageName(pathname)}
            </span>
          )}
        </div>
        <div id="banner-2" className="page-banner" />
        <div id="banner-3" className="page-banner" />
        <div id="banner-4" className="page-banner" />
      </div>
      {children}
    </div>
  );
}
