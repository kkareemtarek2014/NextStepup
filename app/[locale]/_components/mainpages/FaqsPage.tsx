import FaqSection from "../UI/FAQS/FaqSection";
import FaqsTitle from "../UI/FAQS/FaqsTitle";
import GetintouchSection from "../UI/General/GetintouchSection";

export const runtime = "edge";

export default function FaqsPage() {
  return (
    <div>
      <FaqsTitle />
      <FaqSection />
      <GetintouchSection />
    </div>
  );
}
