"use client";

import React, { useEffect, useState } from "react";
import { useLocale } from "next-intl";

const CalendlyPage = () => {
  //   const [calendlyData, setCalendlyData] = useState<any | null>(null);
  //   const [loading, setLoading] = useState<boolean>(true);
  const locale = useLocale();
  const isRTL = locale === "ar";

  //   if (!calendlyData) {
  //     return <div>No Calendly data available</div>;
  //   }

  //   const { Username, Duration } = calendlyData;
  const calendlyUrl = `https://calendly.com/ahmed-walaa-mitchdesigns/30min`;

  return (
    <>
      <style jsx global>{`
        .lmtWIHO_gkbTeeyuvoJC.mOUYF5ZmuNL6I7t0mSFg {
          background-color: #f6f6f6 !important;
        }
      `}</style>

      <div>
        <div className="flex flex-col justify-center text-center items-center mt-[100px] pt-[40px] pb-[45px] bg-teamColor">
          <div className="flex flex-col px-4 lg:px-0">
            <h1 className="text-black text-[40px] md:text-[48px] lg:text-6xl font-medium leading-[50px] lg:leading-[80px] ">
              {isRTL ? "   تواصل معنا" : "Schedule Online Meeting"}
            </h1>
            <p className="text-black text-base md:text-[21px] lg:leading-[27.3px] font-medium ">
              {isRTL
                ? "حدد موعدًا لإجراء مكالمة مع فريقنا وسنتواصل معك في أقرب وقت ممكن"
                : "Schedule a call with our team and we’ll get in touch with you as soon as possible."}
            </p>
          </div>
        </div>
        <div
          className="mb-[45px] bg-[#F6F6F6] !important"
          style={{
            minWidth: "320px",
            height: "651px",
          }}
        >
          <iframe
            src={calendlyUrl}
            width="100%"
            height="100%"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="!bg-[#F6F6F6]"
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default CalendlyPage;
