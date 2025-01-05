import FaqSection from "../UI/FAQS/FaqSection";
import FaqsTitle from "../UI/FAQS/FaqsTitle";
import GetintouchSection from "../UI/General/GetintouchSection";

export const runtime = "edge";

export default function FaqsPage({ faqData }: { faqData: any }) {
  // console.log("faqData", faqData);
  return (
    <div>
      <FaqsTitle title={faqData.data.Title} />
      <FaqSection faqData={faqData.data.FAQSection} />
      <GetintouchSection />
    </div>
  );
}
