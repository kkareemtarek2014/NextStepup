import HeroSection from "../UI/General/HeroSection";
import TextSection from "../UI/General/TextSection";
import SummarySection from "../UI/General/SummarySection";
import TeamSlider from "../UI/About/TeamSlider";
import ApproachSection from "../UI/General/ApproachSection";
import GetintouchSection from "../UI/General/GetintouchSection";
import DiscoverSection from "../UI/General/DiscoverSection";

export const runtime = "edge";

export default function Aboutpage() {
  const textSectionData = {
    title: "Our Story",
    description:
      "We are a family-owned real estate development company based in Egypt. Since 1955, we have been committed to delivering timeless, quality developments that epitomize comfort and functionality.",
  };

  const ThirdSectionData = {
    title: "Leadership",
    description:
      "We aim to innovate and listen closely to our customers to provide them with the best customer experience in every aspect.",
  };

  const heroSectionData = {
    imageSrc: "/img/aboutHero.png",
    heading: "About us",
    subheading:
      "Real Estate developer blending timeless design with comfortable living.",
  };

  return (
    <div>
      <HeroSection
        imageSrc={heroSectionData.imageSrc}
        heading={heroSectionData.heading}
        subheading={heroSectionData.subheading}
      />
      <TextSection {...textSectionData} />
      <SummarySection />
      <TextSection {...ThirdSectionData} />
      <TeamSlider />
      <ApproachSection />
      <DiscoverSection />
      <GetintouchSection />
    </div>
  );
}
