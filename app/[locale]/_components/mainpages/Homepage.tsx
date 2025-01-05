import ApproachSection from "../UI/General/ApproachSection";
import CommunitySlider from "../UI/General/CommunitySlider";
import DiscoverSection from "../UI/General/DiscoverSection";
import GetintouchSection from "../UI/General/GetintouchSection";
import TextSection from "../UI/General/TextSection";
import HomeHero from "../UI/Home/HomeHero";
import OverSection from "../UI/Home/OverSection";
import StatSection from "../UI/Home/StatSection";
export const runtime = "edge";

export default function Homepage({
  locale,
  data,
}: {
  locale: string;
  data: any;
}) {
  const textSectionData = {
    title: data.data.TextSection.SubTitle,
    description: data.data.TextSection.Title,
    paragraph: data.data.TextSection.Description,
  };
  const textSectionData2 = {
    title: data.data.FeaturedSection.SubTitle,
    description: data.data.FeaturedSection.Title,
  };
  return (
    <>
      <HomeHero data={data.data.HeroSection} />
      <TextSection {...textSectionData} />
      <OverSection data={data.data.OverSection} />
      <StatSection data={data.data.ProjectCount} />
      <TextSection
        {...textSectionData2}
        bgcolor="bg-teamColor"
        button={{
          text: data.data.FeaturedSection.buttonTitle,
          href: data.data.FeaturedSection.buttonLink,
        }}
      />
      <CommunitySlider />
      <ApproachSection approachData={data.data.ApproachSection} />
      <DiscoverSection />
      <GetintouchSection />
    </>
  );
}
