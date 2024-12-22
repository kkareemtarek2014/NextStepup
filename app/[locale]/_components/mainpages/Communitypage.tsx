import GetintouchSection from "../UI/General/GetintouchSection";
import HeroSection from "../UI/General/HeroSection";
import CommunitiesSection from "../UI/communities/CommunitiesSection";
export const runtime = "edge";

export default function Communitypage() {
  const heroSectionData = {
    imageSrc: "/img/community.jpeg",
    heading: "Our Communities",
    subheading:
      "Our developments span across Cairo and the North Coast, blending timeless  design with comfortable living spaces for every lifestyle.",
  };

  return (
    <div>
      <HeroSection
        imageSrc={heroSectionData.imageSrc}
        heading={heroSectionData.heading}
        subheading={heroSectionData.subheading}
      />
      <CommunitiesSection />
      <GetintouchSection />
    </div>
  );
}
