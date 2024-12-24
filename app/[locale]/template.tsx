"use client";

import { useEffect } from "react";
import { animatePageIn } from "./utils/animations";

export default function Template({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    animatePageIn();
  }, []);
  return (
    <div className="w-[100vw] h-full">
      <div id="banner-1" className="page-banner" />
      <div id="banner-2" className="page-banner" />
      <div id="banner-3" className="page-banner" />
      <div id="banner-4" className="page-banner" />

      {children}
    </div>
  );
}
