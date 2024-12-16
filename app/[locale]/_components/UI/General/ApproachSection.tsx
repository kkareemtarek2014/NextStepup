"use client";
import Image from "next/image";
import { useState } from "react";

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: "Location",
    answer:
      "Location serves as the foundation upon which we curate remarkable living spaces. We rigorously evaluate each plot we choose, with a focus on accessibility, convenience, and potential for growth. Our strategic selection spans diverse areas across the city, guaranteeing you the best of every neighborhood.",
  },
  {
    question: "Design",
    answer:
      "Location serves as the foundation upon which we curate remarkable living spaces. We rigorously evaluate each plot we choose, with a focus on accessibility, convenience, and potential for growth. Our strategic selection spans diverse areas across the city, guaranteeing you the best of every neighborhood.",
  },
  {
    question: "Construction",
    answer:
      "Location serves as the foundation upon which we curate remarkable living spaces. We rigorously evaluate each plot we choose, with a focus on accessibility, convenience, and potential for growth. Our strategic selection spans diverse areas across the city, guaranteeing you the best of every neighborhood.",
  },
  {
    question: "Construction",
    answer:
      "Location serves as the foundation upon which we curate remarkable living spaces. We rigorously evaluate each plot we choose, with a focus on accessibility, convenience, and potential for growth. Our strategic selection spans diverse areas across the city, guaranteeing you the best of every neighborhood.",
  },
  {
    question: "End-to-End Service",
    answer:
      "Location serves as the foundation upon which we curate remarkable living spaces. We rigorously evaluate each plot we choose, with a focus on accessibility, convenience, and potential for growth. Our strategic selection spans diverse areas across the city, guaranteeing you the best of every neighborhood.",
  },
  // ... rest of the FAQ items
];

export default function ApproachSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative h-fit min-h-[330px] bg-white">
      <div className="max-w-[1512px] mx-auto flex flex-col py-[40px] px-4 lg:px-[56px]">
        <div className="flex flex-col lg:flex-row lg:mb-12 gap-[40px] lg:gap-0">
          <div className="w-full lg:w-[47.29%]">
            <h3 className="text-[24px] lg:text-[28px] leading-[35px] font-medium text-start text-primary">
              Our Approach
            </h3>
          </div>
          <div className="w-full lg:w-[52.71%]">
            <div className="w-full max-w-[900px] mx-auto flex flex-col ">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-borderColor">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex justify-between items-center py-4 lg:py-6 cursor-pointer"
                  >
                    {" "}
                    <div className="flex gap-6 items-center">
                      <h2 className="text-black text-base lg:text-[20px] font-medium leading-[25px]">
                        {String(index + 1).padStart(2, "0")}
                      </h2>
                      <span className="text-black text-base lg:text-[20px] font-medium leading-[25px]">
                        {faq.question}
                      </span>
                    </div>
                    <div
                      className={`w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 transition-transform duration-300 `}
                    >
                      {openIndex === index ? (
                        <img src="/img/minus.svg" alt="minus" />
                      ) : (
                        <img src="/img/plus.svg" alt="plus" />
                      )}
                    </div>
                  </button>

                  <div
                    className={`transition-all duration-300 overflow-hidden ${
                      openIndex === index
                        ? "max-h-[500px] opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="text-black text-sm sm:text-base font-normal leading-normal lg:leading-[22.4px] text-left pb-[24px] lg:p-4 lg:pt-4 lg:pb-6 ">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
