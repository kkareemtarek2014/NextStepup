"use client";
import React from "react";
import CustomSelect from "../General/CustomSelect";
import Button from "../General/Button";
import CustomInputCalculate from "./CustomInputCalculate";

export default function CalculationSection() {
  const options = [
    { value: "6 years", label: "6 years" },
    { value: "3 years", label: "3 years" },
    { value: "1 year", label: "1 year" },
  ] as const;

  return (
    <div className="bg-[url('/img/calculateimg.png')] bg-cover bg-center h-fit relative overflow-hidden">
      <div className="absolute h-full w-full bg-black/20 z-[1]"></div>
      <div className="relative max-w-[1512px] mx-auto w-full flex h-fit z-[2] justify-end">
        <div className="flex flex-col max-w-[728px] w-full p-[40px] gap-6 lg:gap-[40px] bg-white my-[100px] mx-4 lg:mx-0 lg:my-[75px]">
          <h3 className="text-black text-[28px] lg:text-[40px] font-medium leading-[35px] lg:leading-[50px]">
            Calculate your payment
          </h3>
          <div className="flex flex-col gap-3 ">
            <CustomInputCalculate
              title="Amount"
              value={8000000}
              onChange={() => {}}
              size="Mobile"
              type="number"
              fullWidth
              placeholder="Property Value"
            />
            <CustomSelect
              options={options}
              value="6 years"
              onChange={() => {}}
              bgColor="bg-white"
              size="Mobile"
              fullWidth
              title="Payment years"
            />{" "}
            <CustomInputCalculate
              title="Down payment"
              value={8000000}
              onChange={() => {}}
              size="Mobile"
              type="number"
              fullWidth
              placeholder="Property Value"
            />
          </div>
          <div className="flex flex-col lg:flex-row justify-between w-full lg:items-center">
            <div className="flex flex-col gap-2">
              <h3 className="text-primary text-xs font-semimedium">
                Starting Estimated Monthly Payment
              </h3>
              <h4 className="text-black text-[28px] font-medium leading-[35px]">
                EGP 100,000
              </h4>
            </div>{" "}
            <Button
              href={`/`}
              className="px-5 py-3 self-end mt-4 lg:mt-0 bg-black hover:bg-black/70 transition-all duration-300 rounded-[100px] h-fit text-nowrap flex lg:items-center justify-center gap-2 !w-fit"
            >
              <span className="text-white text-sm lg:text-base font-medium leading-[25px] text-start">
                Calculate
              </span>
            </Button>
          </div>
          <p className="text-primary text-[11px] leading-[14px] text-pretty lg:text-sm font-normal lg:font-semimedium ">
            The provided value is an estimate only. The final figure may vary
            due to product availability and potential price change. For the most
            accurate figure, please contact our sales team to discuss
            your specific needs.
          </p>
        </div>
      </div>
    </div>
  );
}
