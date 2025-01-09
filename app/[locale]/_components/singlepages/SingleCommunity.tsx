import TextSection from "../UI/General/TextSection";

import GetintouchSection from "../UI/General/GetintouchSection";
import GallerySlider from "../UI/General/GallerySlider";
import SingleCummunitiesHero from "../UI/communities/SingleCummunitiesHero";
import FeatureSection from "../UI/communities/FeatureSection";
import AmentieSection from "../UI/communities/AmentieSection";
import HighlightSection from "../UI/communities/HighlightSection";
import CalculationSection from "../UI/communities/CalculationSection";
import FixedHeader from "../UI/communities/FixedHeader";
import CommunitySlider from "../UI/General/CommunitySlider";
import ImagePropertyMap from "../UI/maps/ImagePropertyMap";

export const runtime = "edge";

interface Image {
  url: string;
  alternativeText: string | null;
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
}

export default function SingleCommunity({
  communityData,
}: {
  communityData: CommunityData;
}) {
  const parsedData =
    typeof communityData === "string"
      ? JSON.parse(communityData)
      : communityData;

  const textSectionData = {
    title: parsedData.ConceptText.SubTitle,
    description: parsedData.ConceptText.Title,
    paragraph: parsedData.ConceptText.Description,
  };

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
      </div>{" "}
      <div id="map" className="max-w-[1512px] mx-auto pb-4 xlxl:px-0">
        <ImagePropertyMap
          markers={parsedData.MapSection}
          mapImage={`${process.env.NEXT_PUBLIC_IMAGES_DOMAIN}${parsedData.MapImage.url}`}
          mapImageMobile={`${process.env.NEXT_PUBLIC_IMAGES_DOMAIN}${parsedData.MapImageMob.url}`}
          data={parsedData.MapSection}
        />
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
