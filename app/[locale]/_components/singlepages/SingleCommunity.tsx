import TextSection from "../UI/General/TextSection";

import GetintouchSection from "../UI/General/GetintouchSection";
import DiscoverSection from "../UI/General/DiscoverSection";
import GallerySlider from "../UI/General/GallerySlider";
import SingleCummunitiesHero from "../UI/communities/SingleCummunitiesHero";

export const runtime = "edge";

export default function SingleCommunity() {
  const textSectionData = {
    title: "Project Concept",
    description:
      "Nestled along the pristine shores of Ras El Hekma, Seashell brings you closer to crystal clear waters, golden sands and inescapable serenity that knows no bounds.",
    paragraph:
      "Every aspect of the destination is meticulously crafted around your lifestyle, offering an exceptional coastal experience where ultimate relaxation meets world-class hospitality and commercial enjoyment at your door. Harmoniously designed to inspire timeless summer memories, Seashell Ras El Hekma is the place to forge an uninterrupted connection with the natural world.",
  };

  return (
    <div>
      <SingleCummunitiesHero
        imageSrc="/img/cummunityHeero.png"
        imgLogo="/img/LogoComm.svg"
        heading="Seashell Ras El Hekma"
        subheading="Nestled along the pristine shores of Ras El Hekma, Seashell brings you closer to crystal-clear waters, golden sands and inescapable serenity that knows no bounds."
      />
      <TextSection {...textSectionData} />
      <GallerySlider mobile={true} />

      <DiscoverSection />
      <GetintouchSection />
    </div>
  );
}
