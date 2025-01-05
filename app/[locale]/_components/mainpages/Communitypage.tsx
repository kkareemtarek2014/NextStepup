import GetintouchSection from "../UI/General/GetintouchSection";
import HeroSection from "../UI/General/HeroSection";
import CommunitiesSection from "../UI/communities/CommunitiesSection";
export const runtime = "edge";

export default function Communitypage({
  communityData,
  communityPageData,
}: {
  communityData: any;
  communityPageData: any;
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
    imageSrc: `${process.env.NEXT_PUBLIC_IMAGES_DOMAIN}${communityPageData.Image.url}`,
    heading: communityPageData.Title,
    subheading: communityPageData.Description,
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
