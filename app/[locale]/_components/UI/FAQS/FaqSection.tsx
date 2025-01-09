"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";

interface FaqItem {
  Question: string;
  Answer: string;
}

export default function FaqSection({ faqData }: { faqData: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const answerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const iconRefs = useRef<(HTMLImageElement | null)[]>([]);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    faqData.forEach((_, idx) => {
      const answerElement = answerRefs.current[idx];
      const iconElement = iconRefs.current[idx];

      if (answerElement && iconElement) {
        if (openIndex === idx) {
          gsap.to(answerElement, {
            height: "auto",
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
          });

          gsap.to(iconElement, {
            rotation: 180,
            duration: 0.1,
            ease: "power2.out",
          });
        } else {
          gsap.to(answerElement, {
            height: 0,
            opacity: 0,
            duration: 0.1,
            ease: "power2.out",
          });

          gsap.to(iconElement, {
            rotation: 0,
            duration: 0.1,
            ease: "power2.out",
          });
        }
      }
    });
  }, [openIndex, faqData]);

  return (
    <section className="relative bg-teamColor pb-[80px] lg:pb-[100px] px-4 sm:px-6">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row flex-wrap gap-6">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="bg-white h-fit w-full md:w-[calc(50%-12px)]"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex justify-between items-center cursor-pointer p-6"
              >
                <span className="text-base sm:text-lg text-black text-left">
                  {faq.Question}
                </span>
                <img
                  ref={(el) => {
                    iconRefs.current[index] = el;
                  }}
                  src={openIndex === index ? "/img/minus.svg" : "/img/plus.svg"}
                  alt={openIndex === index ? "minus" : "plus"}
                  className="transition-transform duration-300"
                />
              </button>

              <div
                ref={(el) => {
                  answerRefs.current[index] = el;
                }}
                className="overflow-hidden"
                style={{ height: 0, opacity: 0 }}
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
