"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { animatePageIn } from "./utils/animations";
import { getPageName } from "./utils/getPageName";
import { getCommunityBySlugLoader } from "./api/general";

interface ImageData {
  url: string;
  formats: {
    thumbnail?: { url: string };
    small?: { url: string };
    medium?: { url: string };
    large?: { url: string };
  };
}

interface ImagesLoaderData {
  id: number;
  MainImage: ImageData;
  Images: {
    data: Array<{
      id: number;
      attributes: ImageData;
    }>;
  };
}

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [imagesData, setImagesData] = useState<ImagesLoaderData | null>(null);
  const [loading, setLoading] = useState(false);

  const isHomePage = pathname === "/" || pathname.endsWith("/home");
  const isCommunityPage = pathname === "/community";
  const isSingleCommunityPage = pathname.startsWith("/community/") && pathname !== "/community";
  const isMediaPage = pathname === "/media" || pathname.startsWith("/media/");

  const showTemplate = (isHomePage || isCommunityPage || isSingleCommunityPage) && !isMediaPage;

  useEffect(() => {
    const loadCommunityImages = async () => {
      if (isSingleCommunityPage) {
        try {
          setLoading(true);
          const slug = pathname.split('/').pop() || '';
          const locale = pathname.split('/')[1] || 'en'; 
          console.log("Locale:", locale);
          console.log("Slug:", slug);
          const data = await getCommunityBySlugLoader(locale, slug);
          console.log("Data:", data);
          setImagesData(data);
        } catch (error) {
          console.error('Error loading community images:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    loadCommunityImages();
  }, [pathname, isSingleCommunityPage]);
  console.log("Images Data:", imagesData);
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
      {loading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
        </div>
      ) : (
        children
      )}
    </div>
  );
}
