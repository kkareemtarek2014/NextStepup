import React, { useState, useRef, useEffect } from "react";
import CheckboxUnFill from "../../Icons/CheckboxUnFill";
import CheckboxFill from "../../Icons/CheckboxFill";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  title?: string;
  bgColor?: string;
  options: readonly Option[];
  value: string | string[];
  size?: "small" | "medium" | "Mobile";
  fullWidth?: boolean;
  onChange: (value: string | string[]) => void;
  id?: string;
  width?: string;
  textCenter?: boolean;
  className?: string;
  popupMobile?: boolean;
  checkbox?: boolean;
  height?: string;
}

export default function CustomSelect({
  title,
  bgColor,
  options,
  value,
  size,
  fullWidth,
  width,
  onChange,
  id,
  textCenter,
  className,
  popupMobile,
  checkbox,
  height,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState<string[]>(
    Array.isArray(value) ? value : [value]
  );
  const selectRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    setSelectedValues(Array.isArray(value) ? value : [value]);
  }, [value]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (selectedValue: string) => {
    if (checkbox) {
      let newSelectedValues: string[];

      if (selectedValue === "all") {
        newSelectedValues = ["all"];
      } else {
        const withoutAll = selectedValues.filter((val) => val !== "all");

        if (withoutAll.includes(selectedValue)) {
          newSelectedValues = withoutAll.filter((val) => val !== selectedValue);
          if (newSelectedValues.length === 0) newSelectedValues = ["all"];
        } else {
          newSelectedValues = [...withoutAll, selectedValue];
        }
      }

      setSelectedValues(newSelectedValues);
      onChange(newSelectedValues);
    } else {
      onChange(selectedValue);
      if (!popupMobile) {
        setIsOpen(false);
      }
    }
  };

  const getDisplayLabel = () => {
    if (checkbox) {
      if (selectedValues.includes("all")) {
        return (
          options.find((opt) => opt.value === "all")?.label || options[0].label
        );
      }
      return selectedValues.length === 1
        ? options.find((opt) => opt.value === selectedValues[0])?.label
        : `${selectedValues.length} Selected`;
    }

    // Non-checkbox case
    return (
      options.find((opt) => opt.value === value)?.label || options[0].label
    );
  };

  return (
    <div
      ref={selectRef}
      className={`${
        popupMobile ? "" : "border border-borderColor"
      } relative w-full sm:w-fit lg:min-w-[200px] ${
        fullWidth ? "!w-full lg:!w-full" : width ? width : ""
      } ${className}`}
    >
      <div
        className={`flex items-center cursor-pointer w-full !h-fit justify-between ${
          bgColor || ""
        } ${size === "small" ? "py-[4.5px] px-4" : ""} ${
          size === "medium" ? "py-[14px] lg:py-[15px] px-3 lg:px-4" : ""
        } ${size === "Mobile" ? "py-[6px] lg:!py-[4.5px] px-3 lg:px-4" : ""}`}
        onClick={toggleDropdown}
      >
        <div className="flex flex-col gap-1 w-full lg:min-w-[136px]">
          <h3
            className={`${
              popupMobile ? "text-base font-medium" : "text-xs font-normal"
            } lg:font-semimedium text-black`}
          >
            {title}
          </h3>
          <h4
            className={`${
              popupMobile
                ? "hidden font-semimedium"
                : "block font-normal lg:font-semimedium"
            } text-base text-black text-start leading-[22.4px] items-center text-nowrap w-fit`}
          >
            {getDisplayLabel()}
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
        <div
          className={`${
            popupMobile ? "relative" : "absolute border border-borderColor"
          } top-full left-0 w-full bg-white mt-1 z-50 ${height}`}
        >
          {options.map((option) => (
            <div
              key={option.value}
              className={`px-4 py-2 cursor-pointer hover:bg-gray-50 text-black text-base font-normal lg:font-semimedium  ${
                selectedValues.includes(option.value) ? "bg-gray-100" : ""
              } ${textCenter ? "text-center" : "text-start"} ${
                checkbox ? "flex items-center gap-2" : ""
              }`}
              onClick={() => handleSelect(option.value)}
            >
              {checkbox && (
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedValues.includes(option.value)}
                    readOnly
                    className="peer absolute opacity-0 h-4 w-4"
                  />
                  <span className="hidden w-5 peer-checked:block rounded-[4px]">
                    <CheckboxFill />
                  </span>
                  <span className="block w-5 peer-checked:hidden rounded-[4px]">
                    <CheckboxUnFill />
                  </span>
                </div>
              )}
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
