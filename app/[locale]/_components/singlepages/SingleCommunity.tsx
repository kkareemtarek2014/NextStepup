import TextSection from "../UI/General/TextSection";

import GetintouchSection from "../UI/General/GetintouchSection";
import DiscoverSection from "../UI/General/DiscoverSection";
import GallerySlider from "../UI/General/GallerySlider";
import SingleCummunitiesHero from "../UI/communities/SingleCummunitiesHero";
import FeatureSection from "../UI/communities/FeatureSection";
import AmentieSection from "../UI/communities/AmentieSection";
import HighlightSection from "../UI/communities/HighlightSection";
import CalculationSection from "../UI/communities/CalculationSection";
import FixedHeader from "../UI/communities/FixedHeader";
import CommunitySlider from "../UI/General/CommunitySlider";

export const runtime = "edge";

// Define TypeScript interfaces for component props
interface Image {
  url: string;
  alternativeText: string | null;
  // Add other image properties as needed
}

interface Button {
  ButtonTitle: string;
  ButtonLink: string;
}

interface HeroSection {
  Title: string;
  Description: string;
  SmallImage: Image;
  MainImage: Image;
  DownloadButton: Button;
  Button: Button;
}

interface CommunityData {
  HeroSection: HeroSection;
  // Add other sections as needed
}

export default function SingleCommunity({
  communityData,
}: {
  communityData: CommunityData;
}) {
  // Parse the data if it's a string
  const parsedData =
    typeof communityData === "string"
      ? JSON.parse(communityData)
      : communityData;

  const textSectionData = {
    title: parsedData.ConceptText.SubTitle,
    description: parsedData.ConceptText.Title,
    paragraph: parsedData.ConceptText.Description,
  };

  // console.log("Parsed Data:", parsedData);

  return (
    <div>
      <SingleCummunitiesHero
        imageSrc={`${process.env.NEXT_PUBLIC_IMAGES_DOMAIN}${parsedData.HeroSection.MainImage.url}`}
        imgLogo={`${process.env.NEXT_PUBLIC_IMAGES_DOMAIN}${parsedData.HeroSection.SmallImage.url}`}
        heading={parsedData.HeroSection.Title}
        subheading={parsedData.HeroSection.Description}
      />

      <div id="concept">
        <TextSection {...textSectionData} />
      </div>
      <div id="gallery">
        <GallerySlider mobile={true} galleryData={parsedData.GallerySection} />
      </div>
      <div id="features">
        <FeatureSection featureData={parsedData.FeatureSection} />
      </div>
      <div id="amenities">
        <AmentieSection amenitieData={parsedData.AmenitieSection} />
      </div>
      <div id="location">
        <HighlightSection highlightData={parsedData.HighlightSection} />
      </div>
      <div id="calculator">
        <CalculationSection calculateData={parsedData.CalculateSection} />
      </div>
      <CommunitySlider
        title="Discover more projects"
        button={{ text: "All Communities", href: "/communities" }}
      />
      <div id="inquire">
        <GetintouchSection />
      </div>
      <FixedHeader />
    </div>
  );
}
