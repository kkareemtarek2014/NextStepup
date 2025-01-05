import HeroSection from "../UI/General/HeroSection";
import TextSection from "../UI/General/TextSection";
import SummarySection from "../UI/General/SummarySection";
import TeamSlider from "../UI/About/TeamSlider";
import ApproachSection from "../UI/General/ApproachSection";
import GetintouchSection from "../UI/General/GetintouchSection";
import DiscoverSection from "../UI/General/DiscoverSection";

export const runtime = "edge";

// First, let's define the types for our data structure
interface HeroSectionData {
  Title: string;
  Description: string;
  Image: {
    url: string;
    // Add other image properties if needed
  };
}

interface AboutData {
  HeroSection: HeroSectionData;
  // Add other data types as needed
}

interface ConceptTextItem {
  id: number;
  SubTitle: string;
  Title: string;
  Description: string | null;
}

interface LeadershipText {
  id: number;
  SubTitle: string;
  Title: string;
  Description: string | null;
}

export default function Aboutpage({ aboutData }: { aboutData: AboutData }) {
  const parsedData =
    typeof aboutData === "string" ? JSON.parse(aboutData) : aboutData;
  // console.log(parsedData.data.HeroSection);

  const textSectionData = {
    title: parsedData.data.ConceptText[0].SubTitle,
    description: parsedData.data.ConceptText[0].Title,
    paragraph: parsedData.data.ConceptText[0].Description || "",
  };

  const ThirdSectionData = {
    title: parsedData.data.LeadershipText.SubTitle,
    description: parsedData.data.LeadershipText.Title,
    paragraph: parsedData.data.LeadershipText.Description || "",
  };

  return (
    <div>
      <HeroSection
        imageSrc={`${process.env.NEXT_PUBLIC_IMAGES_DOMAIN}${parsedData.data.HeroSection.Image.url}`}
        heading={parsedData.data.HeroSection.Title}
        subheading={parsedData.data.HeroSection.Description}
      />
      <TextSection {...textSectionData} />
      <SummarySection featuredData={parsedData.data.FeaturedSection} />{" "}
      <TextSection {...ThirdSectionData} />
      <TeamSlider teamMembers={parsedData.data.LeadershipSlider} />
      <ApproachSection approachData={parsedData.data.ApproachSection} />
      <DiscoverSection />
      <GetintouchSection />
    </div>
  );
}
