"use client";
import { useEffect, useState } from "react";

const sections = [
  { id: "concept", label: "PROJECT CONCEPT" },
  { id: "gallery", label: "Gallery" },
  { id: "features", label: "Features" },
  { id: "amenities", label: "Amenities" },
  { id: "location", label: "LOCATION MAP" },
  { id: "calculator", label: "PAYMENT CALCULATOR" },
  { id: "inquire", label: "INQUIRE" },
];

function FixedHeader() {
  const [activeSection, setActiveSection] = useState<string>("concept");
  const [isInHero, setIsInHero] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Check if user has scrolled at all
      const scrollPosition = window.scrollY;
      setIsInHero(scrollPosition === 0);

      // Find active section based on scroll position
      const sectionElements = sections.map((section) =>
        document.getElementById(section.id)
      );

      const currentSection = sectionElements.reduce((nearest, section) => {
        if (!section) return nearest;
        const distance = Math.abs(
          section.getBoundingClientRect().top - window.innerHeight * 0.5
        );
        return !nearest || distance < nearest.distance
          ? { id: section.id, distance }
          : nearest;
      }, null as { id: string; distance: number } | null);

      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const offset = 300; // Adjust offset as needed
      const targetPosition =
        section.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="fixed hidden lg:block bottom-0 left-0 right-0   z-50 ">
      <div
        className={`max-w-[1400px] w-fit mx-auto px-[40px] transition-all duration-300 backdrop-blur-md bg-[#F5F5F599] border ${
          isInHero ? "mb-[82px]" : "mb-[50px]"
        } border-[#EBEBEB] rounded-[100px]`}
      >
        <nav className="flex gap-4 justify-between items-center overflow-x-auto hide-scrollbar">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`pt-4 pb-[18px] text-sm font-medium uppercase whitespace-nowrap transition-colors duration-300 relative group ${
                activeSection === section.id
                  ? "text-black"
                  : "text-black hover:text-black/50"
              }`}
            >
              {section.label}
              <span
                className={`absolute left-0 bottom-0 h-[1px] bg-black transition-all duration-300 ${
                  activeSection === section.id
                    ? "w-full"
                    : "w-0 group-hover:w-full"
                }`}
              />
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}

export default FixedHeader;
