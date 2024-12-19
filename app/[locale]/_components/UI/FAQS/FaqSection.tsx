"use client";

import { useState } from "react";

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: "What’s involved in the closing process?",
    answer:
      "Location serves as the foundation upon which we curate remarkable living spaces. We rigorously evaluate each plot we choose, with a focus on accessibility, convenience, and potential for growth. Our strategic selection spans diverse areas across the city, guaranteeing you the best of every neighborhood.",
  },
  {
    question: "What’s involved in the closing process?",
    answer:
      "Location serves as the foundation upon which we curate remarkable living spaces. We rigorously evaluate each plot we choose, with a focus on accessibility, convenience, and potential for growth. Our strategic selection spans diverse areas across the city, guaranteeing you the best of every neighborhood.",
  },
  {
    question: "What’s involved in the closing process?",
    answer:
      "Location serves as the foundation upon which we curate remarkable living spaces. We rigorously evaluate each plot we choose, with a focus on accessibility, convenience, and potential for growth. Our strategic selection spans diverse areas across the city, guaranteeing you the best of every neighborhood.",
  },
  {
    question: "What’s involved in the closing process?",
    answer:
      "Location serves as the foundation upon which we curate remarkable living spaces. We rigorously evaluate each plot we choose, with a focus on accessibility, convenience, and potential for growth. Our strategic selection spans diverse areas across the city, guaranteeing you the best of every neighborhood.",
  },
  {
    question: "What’s involved in the closing process??",
    answer:
      "Location serves as the foundation upon which we curate remarkable living spaces. We rigorously evaluate each plot we choose, with a focus on accessibility, convenience, and potential for growth. Our strategic selection spans diverse areas across the city, guaranteeing you the best of every neighborhood.",
  },
  {
    question: "What’s involved in the closing process?",
    answer:
      "Location serves as the foundation upon which we curate remarkable living spaces. We rigorously evaluate each plot we choose, with a focus on accessibility, convenience, and potential for growth. Our strategic selection spans diverse areas across the city, guaranteeing you the best of every neighborhood.",
  },
  {
    question: "What’s involved in the closing process?",
    answer:
      "Location serves as the foundation upon which we curate remarkable living spaces. We rigorously evaluate each plot we choose, with a focus on accessibility, convenience, and potential for growth. Our strategic selection spans diverse areas across the city, guaranteeing you the best of every neighborhood.",
  },
  {
    question: "What’s involved in the closing process?",
    answer:
      "Location serves as the foundation upon which we curate remarkable living spaces. We rigorously evaluate each plot we choose, with a focus on accessibility, convenience, and potential for growth. Our strategic selection spans diverse areas across the city, guaranteeing you the best of every neighborhood.",
  },
  {
    question: "What’s involved in the closing process?",
    answer:
      "Location serves as the foundation upon which we curate remarkable living spaces. We rigorously evaluate each plot we choose, with a focus on accessibility, convenience, and potential for growth. Our strategic selection spans diverse areas across the city, guaranteeing you the best of every neighborhood.",
  },
  {
    question: "What’s involved in the closing process?",
    answer:
      "Location serves as the foundation upon which we curate remarkable living spaces. We rigorously evaluate each plot we choose, with a focus on accessibility, convenience, and potential for growth. Our strategic selection spans diverse areas across the city, guaranteeing you the best of every neighborhood.",
  },
  {
    question: "What’s involved in the closing process?",
    answer:
      "Location serves as the foundation upon which we curate remarkable living spaces. We rigorously evaluate each plot we choose, with a focus on accessibility, convenience, and potential for growth. Our strategic selection spans diverse areas across the city, guaranteeing you the best of every neighborhood.",
  },
  {
    question: "What’s involved in the closing process?",
    answer:
      "Location serves as the foundation upon which we curate remarkable living spaces. We rigorously evaluate each plot we choose, with a focus on accessibility, convenience, and potential for growth. Our strategic selection spans diverse areas across the city, guaranteeing you the best of every neighborhood.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative bg-teamColor pb-[80px] lg:pb-[100px] px-4 sm:px-6">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row flex-wrap gap-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white h-fit w-full md:w-[calc(50%-12px)]"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex justify-between items-center cursor-pointer p-6"
              >
                <span className="text-base sm:text-lg text-black text-left ">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <img src="/img/minus.svg" alt="minus" />
                ) : (
                  <img src="/img/plus.svg" alt="plus" />
                )}
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index
                    ? "max-h-[500px] opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-sm sm:text-base text-black px-6 py-4 font-normal lg:font-semimedium">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
