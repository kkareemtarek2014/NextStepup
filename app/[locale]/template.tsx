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

interface CommunityImageData {
  id: number;
  MainImage: ImageData;
  SecondImage: ImageData;
  ThirdImage: ImageData;
  FourthImage: ImageData;
}

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [imagesData, setImagesData] = useState<CommunityImageData | null>(null);
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
          const data = await getCommunityBySlugLoader(locale, slug);
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
          className="page-banner flex items-center justify-center relative bg-black"
        >
           {/* {imagesData?.MainImage?.url && (
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGES_DOMAIN}${imagesData.MainImage.url}`}
              alt="Banner background"
              fill
              priority
              quality={75}
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4dHRsdHR4dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR3/2wBDAR0XFyAeIRshIRshHRsdIR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR3/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
              className="object-cover"
              sizes="100vw"
              style={{
                opacity: 0.8,
              }}
            />
          )}
          <div className="absolute inset-0 bg-black/50" style={{ */}
          <div className="absolute inset-0 bg-black" />
          <div className="absolute inset-0" style={{
            background: `
              linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
              linear-gradient(231.3deg, rgba(0, 0, 0, 0) 27.76%, #000000 79.21%)
            `,
          }}/>
          {isHomePage ? (
            <Image
              src="/logo_primary.svg"
              alt="Logo"
              width={500}
              height={40}
              priority
              className="opacity-0 px-4 lg:px-0"
              id="banner-text"
            />
          ) : (
            <span
              id="banner-text"
              className="text-white text-4xl md:text-6xl font-medium opacity-0 capitalize"
            >
              {getPageName(pathname)}
            </span>
          )}
        </div>
        <div 
          id="banner-2" 
          className="page-banner"
          style={imagesData?.SecondImage?.url ? {
            backgroundImage: `url(${process.env.NEXT_PUBLIC_IMAGES_DOMAIN}${imagesData.SecondImage.url})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: 0.6
          } : { backgroundColor: '#0a0a0a' }}
        />
        <div 
          id="banner-3" 
          className="page-banner"
          style={imagesData?.ThirdImage?.url ? {
            backgroundImage: `url(${process.env.NEXT_PUBLIC_IMAGES_DOMAIN}${imagesData.ThirdImage.url})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: 0.4
          } : { backgroundColor: '#121212' }}
        />
        <div 
          id="banner-4" 
          className="page-banner"
          style={imagesData?.FourthImage?.url ? {
            backgroundImage: `url(${process.env.NEXT_PUBLIC_IMAGES_DOMAIN}${imagesData.FourthImage.url})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: 0.2
          } : { backgroundColor: '#1a1a1a' }}
        />
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
