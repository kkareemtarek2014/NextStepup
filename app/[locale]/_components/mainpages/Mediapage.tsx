import HeroSection from "../UI/General/HeroSection";
import GetintouchSection from "../UI/General/GetintouchSection";
import GallerySlider from "../UI/General/GallerySlider";
import MediaListSection from "../UI/media/MediaListSection";

export const runtime = "edge";

export default function MediaPage() {
  const heroSectionData = {
    imageSrc: "/img/mediahero.jpeg",
    heading: "Media Center",
    subheading: "Hear about our latest news and events.",
  };

  return (
    <div>
      <HeroSection
        imageSrc={heroSectionData.imageSrc}
        heading={heroSectionData.heading}
        subheading={heroSectionData.subheading}
      />
      <MediaListSection />

      <GallerySlider mobile={true} />
      <GetintouchSection />
    </div>
  );
}
