"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { animatePageIn } from "./utils/animations";
import { getPageName } from "./utils/getPageName";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    animatePageIn(getPageName(pathname));
  }, [pathname]);

  return (
    <div className="overflow-x-hidden">
      <div className="flex">
        <div
          id="banner-1"
          className="page-banner flex items-center justify-center"
        >
          <span
            id="banner-text"
            className="text-white text-4xl md:text-6xl font-medium opacity-0"
          >
            {getPageName(pathname)}
          </span>
        </div>
        <div id="banner-2" className="page-banner" />
        <div id="banner-3" className="page-banner" />
        <div id="banner-4" className="page-banner" />
      </div>
      {children}
    </div>
  );
}
