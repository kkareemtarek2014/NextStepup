"use client";

import { useState } from "react";

export default function FaqSection({ faqData }: { faqData: any }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative bg-teamColor pb-[80px] lg:pb-[100px] px-4 sm:px-6">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row flex-wrap gap-6">
          {faqData.map((faq: any, index: any) => (
            <div
              key={index}
              className="bg-white h-fit w-full md:w-[calc(50%-12px)]"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex justify-between items-center cursor-pointer p-6"
              >
                <span className="text-base sm:text-lg text-black text-left ">
                  {faq.Question}
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
                  {faq.Answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
