"use client";

import { useCountAnimation } from "@/app/[locale]/utils/animations/useCountAnimation";

interface NumberCounterProps {
  id: string;
  value: string;
  title: string;
  showK?: boolean;
  className?: string;
  titleClassName?: string;
}

export default function NumberCounter({
  id,
  value,
  title,
  showK = false,
  className = "",
  titleClassName = "",
}: NumberCounterProps) {
  // Parse the value to handle decimals
  const numericValue = parseFloat(value);

  useCountAnimation({
    elementId: id,
    endValue: numericValue,
    duration: 1.5,
    suffix: showK ? "k" : "",
    decimals: value.includes(".") ? value.split(".")[1].length : 0,
  });

  return (
    <div className="flex flex-col w-[33%]">
      <h2
        id={id}
        className={`text-[40px] leading-[50px] lg:text-[60px] lg:leading-[75px] font-medium text-black ${className}`}
      >
        0
      </h2>
      <h3
        className={`text-base font-normal lg:font-semimedium text-black leading-[22.4px] ${titleClassName}`}
      >
        {title}
      </h3>
    </div>
  );
}
