import React, { ChangeEvent } from "react";

interface CustomInputCalculateProps {
  title?: string;
  bgColor?: string;
  value: string | number;
  size?: "small" | "medium" | "Mobile";
  fullWidth?: boolean;
  onChange: (value: string) => void;
  id?: string;
  width?: string;
  placeholder?: string;
  className?: string;
  type?: "text" | "number";
}

export default function CustomInputCalculate({
  title,
  bgColor,
  value,
  size,
  fullWidth,
  width,
  onChange,
  id,
  placeholder,
  className,
  type = "text",
}: CustomInputCalculateProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div
      className={`border border-borderColor relative w-full sm:w-fit lg:min-w-[200px] ${
        fullWidth ? "!w-full lg:!w-full" : width ? width : ""
      } `}
    >
      <div
        className={`flex items-center w-full !h-fit ${bgColor || ""} ${
          size === "small" ? "py-[4.5px] px-4" : ""
        } ${size === "medium" ? "py-[14px] lg:py-[15px] px-3 lg:px-4" : ""} ${
          size === "Mobile" ? "py-[6px] lg:!py-3 px-3" : ""
        } `}
      >
        <div className="flex   w-full lg:min-w-[136px] gap-4 items-center">
          <h3 className="text-sm font-medium text-black uppercase ">EGP</h3>
          <div className="flex flex-col gap-1 w-full">
            {title && (
              <h3 className="text-xs font-normal lg:font-semimedium text-black">
                {title}
              </h3>
            )}
            <input
              type={type}
              id={id}
              value={value}
              onChange={handleChange}
              placeholder={placeholder}
              className="w-full bg-transparent text-base text-black font-medium leading-[22.4px] outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
