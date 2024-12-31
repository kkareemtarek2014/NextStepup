import GetintouchSection from "../UI/General/GetintouchSection";
import HeroSection from "../UI/General/HeroSection";
import CommunitiesSection from "../UI/communities/CommunitiesSection";
export const runtime = "edge";

export default function Communitypage({
  communityData,
}: {
  communityData: any;
}) {
  // Wrap the array in the expected ApiResponse format
  const formattedApiData = {
    data: communityData,
    meta: {
      pagination: {
        total: communityData.length,
      },
    },
  };

  const heroSectionData = {
    imageSrc: `${process.env.NEXT_PUBLIC_IMAGES_DOMAIN}${communityData[0].HeroSection.MainImage.url}`,
    heading: "Our Communities",
    subheading:
      "Our developments span across Cairo and the North Coast, blending timeless design with comfortable living spaces for every lifestyle.",
  };

  // console.log(heroSectionData.imageSrc);

  return (
    <div>
      <HeroSection
        imageSrc={heroSectionData.imageSrc}
        heading={heroSectionData.heading}
        subheading={heroSectionData.subheading}
      />
      <CommunitiesSection apiData={formattedApiData} />
      <GetintouchSection />
    </div>
  );
}
