"use client";

import React, { useState, useRef, useEffect } from "react";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  title: string;
  options: readonly Option[];
  value: string;
  onChange: (value: string) => void;
  id: string;
}

export default function CustomSelect({
  title,
  options,
  value,
  onChange,
  id,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (selectedValue: string) => {
    console.log("Selected value:", selectedValue);
    onChange(selectedValue);
    setIsOpen(false);
  };

  const selectedOption =
    options.find((opt) => opt.value === value) || options[0];

  return (
    <div
      ref={selectRef}
      className="relative w-full sm:w-fit lg:min-w-[200px] border border-borderColor"
    >
      <div
        className="flex gap-2 py-[4.5px] px-4 items-center cursor-pointer"
        onClick={toggleDropdown}
      >
        <div className="flex flex-col gap-1 w-fit min-w-[136px]">
          <h3 className="text-xs font-semimedium text-black">{title}</h3>
          <h4 className="text-base font-semimedium text-black">
            {selectedOption.label}
          </h4>
        </div>
        <img
          src="/img/arrow-bottom.svg"
          alt="arrowdown"
          className={`h-6 w-6 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white border border-borderColor mt-1 z-50">
          {options.map((option) => (
            <div
              key={option.value}
              className={`px-4 py-2 cursor-pointer hover:bg-gray-50 text-black text-base font-semimedium ${
                option.value === value ? "bg-gray-100" : ""
              }`}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
