import CalendlySection from "../UI/Contact/CalendlySection";
import ContactForm from "../UI/Contact/ContactForm";
import ContactContent from "../UI/Contact/ContactContent";

export const runtime = "edge";

export default function ContactUsPage() {
  return (
    <div>
      <CalendlySection />
      <ContactForm />
      <ContactContent />
    </div>
  );
}
