import ApproachSection from "../UI/General/ApproachSection";
import CommunitySlider from "../UI/General/CommunitySlider";
import DiscoverSection from "../UI/General/DiscoverSection";
import GetintouchSection from "../UI/General/GetintouchSection";
import TextSection from "../UI/General/TextSection";
import HomeHero from "../UI/Home/HomeHero";
import OverSection from "../UI/Home/OverSection";
import StatSection from "../UI/Home/StatSection";
export const runtime = "edge";

export default function Homepage() {
  const textSectionData = {
    title: "About Us",
    description:
      "We are a family-owned real estate development company based in Egypt. Since 1955, we have been committed to delivering timeless, quality developments that epitomize comfort and functionality.",
  };
  const textSectionData2 = {
    title: "Featured Projects",
    buttonText: "View All Communities",
    description:
      "Our developments span across Cairo and the North Coast, blending timeless design with comfortable living spaces for every lifestyle.",
  };
  return (
    <>
      <HomeHero />
      <TextSection {...textSectionData} />
      <OverSection />
      <StatSection />
      <TextSection
        {...textSectionData2}
        bgcolor="bg-teamColor"
        button={{ text: "View All Communities", href: "/communities" }}
      />
      <CommunitySlider />
      <ApproachSection />
      <DiscoverSection />
      <GetintouchSection />
    </>
  );
}
