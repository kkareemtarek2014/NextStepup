import HeroSection from "../UI/General/HeroSection";
import GetintouchSection from "../UI/General/GetintouchSection";
import GallerySlider from "../UI/General/GallerySlider";
import MediaListSection from "../UI/media/MediaListSection";

export const runtime = "edge";

export default function MediaPage({
  data,
  mediaPage,
}: {
  data: any;
  mediaPage: any;
}) {
  return (
    <div>
      <HeroSection
        imageSrc={`${process.env.NEXT_PUBLIC_IMAGES_DOMAIN}${mediaPage?.data?.MediaHero?.Image?.url}`}
        heading={mediaPage?.data?.MediaHero?.Title}
        subheading={mediaPage?.data?.MediaHero?.Description}
      />
      <MediaListSection apiData={data} />
      <GallerySlider mobile={true} galleryData={mediaPage?.data?.Gallery} />
      <GetintouchSection />
    </div>
  );
}
