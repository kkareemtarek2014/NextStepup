import HeroCareer from "../UI/Career/HeroCareer";
import JobSection from "../UI/Career/JobSection";
import ValusSection from "../UI/Career/ValusSection";
import GallerySlider from "../UI/General/GallerySlider";
import GetintouchSection from "../UI/General/GetintouchSection";
import TextSection from "../UI/General/TextSection";

export const runtime = "edge";

export default function Aboutpage() {
  const textSectionData = {
    title: "About Us",
    description:
      "We are a family-owned real estate development company based in Egypt. Since 1955, we have been committed to delivering timeless, quality developments that epitomize comfort and functionality.",
  };
  return (
    <div>
      <HeroCareer />
      <TextSection {...textSectionData} />
      <GallerySlider />
      <ValusSection />
      <JobSection />
      <GetintouchSection />
    </div>
  );
}
