import HeroCareer from "../UI/Career/HeroCareer";
import JobSection from "../UI/Career/JobSection";
import ValusSection from "../UI/Career/ValusSection";
import GallerySlider from "../UI/General/GallerySlider";
import GetintouchSection from "../UI/General/GetintouchSection";
import TextSection from "../UI/General/TextSection";

export const runtime = "edge";

export default function Careerpage({ data, jobs }: { data: any; jobs: any }) {
  const textSectionData = {
    title: data.data.ConceptText.SubTitle,
    description: data.data.ConceptText.Title,
    paragraph: data.data.ConceptText.Description || "",
  };

  const jobTitle = data.data.CareerText;
  return (
    <div>
      <HeroCareer data={data.data.CareerHero} />
      <TextSection {...textSectionData} />
      <GallerySlider galleryData={data.data.GallerySection} />
      <ValusSection valuesData={data.data.ValueSection} />
      <JobSection jobs={jobs} jobTitle={jobTitle} />
      <GetintouchSection />
    </div>
  );
}
