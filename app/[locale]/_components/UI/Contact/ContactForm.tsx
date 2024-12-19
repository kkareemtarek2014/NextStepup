"use client";

import React from "react";
import CustomSelect from "../General/CustomSelect";
import CustomInput from "../General/CustomInput";
import Button from "../General/Button";
import ArrowIcon from "../../Icons/ArrowIcon";

const ContactForm = () => {
  const typeOptions = [
    { value: "inquiry", label: "Inquiry type" },
    { value: "news", label: "News" },
    { value: "events", label: "Events" },
  ] as const;
  const PhoneOptions = [
    { value: "EG (+20)", label: "EG (+20)" },
    { value: "US (+1)", label: "US (+1)" },
    { value: "UK (+44)", label: "UK (+44)" },
  ] as const;
  return (
    <>
      <div className="flex flex-col justify-center text-center items-center pt-[60px] px-4 lg:px-0  pb-[40px] lg:pb-[64px] bg-borderColor">
        <div className="flex flex-col text-center items-center gap-3 lg:gap-6 ">
          <h1 className="text-black text-[25px] md:text-[40px] font-medium leading-[62px] md:leading-[50px] ">
            Send ad Inquiry{" "}
          </h1>
          <p className="text-black text-xs md:text-base  font-normal lg:font-semimedium max-w-[475px]">
            We’d love to hear from you, if you have any inquires please fill
            this form and we’ll get in touch with you as soon as possible.{" "}
          </p>
        </div>

        <div className="max-w-[784px] mx-auto w-full ">
          <form className="flex flex-col  gap-3 lg:gap-6   mt-[40px] lg:mt-16">
            <CustomSelect
              options={typeOptions}
              value="Inquiry type"
              onChange={() => {}}
              bgColor="bg-white"
              size="medium"
              fullWidth
            />
            <div className="flex gap-4 w-full ">
              <CustomInput
                config={{
                  type: "text",
                  name: "First name",
                  placeholder: "First name",
                }}
              />
              <CustomInput
                config={{
                  type: "text",
                  name: "Last name",
                  placeholder: "Last name",
                }}
              />
            </div>
            <CustomInput
              config={{
                type: "text",
                name: "Email address",
                placeholder: "Email address",
              }}
            />
            <div className="flex gap-4 w-full ">
              <CustomSelect
                options={PhoneOptions}
                value="EG (+20)"
                onChange={() => {}}
                bgColor="bg-white"
                size="medium"
                width="max-w-[140px] lg:!w-[140px] "
              />
              <CustomInput
                config={{
                  type: "text",
                  name: "Phone number",
                  placeholder: "Phone number",
                }}
              />
            </div>
            <textarea
              name="message"
              placeholder={"Add your message"}
              className="form-field h-[112px] resize-none placeholder:!text-black font-normal lg:font-semimedium !text-black px-4 py-3 !border-bordercontact"
              //   value={values.message}
              //   onChange={handleChange}
            />
            <Button
              href="/contact-us"
              className="px-5 py-3 lg:py-6 lg:px-10 bg-black  hover:bg-black/80 transition-all duration-300 rounded-[100px] h-fit text-nowrap flex items-center !self-end  !justify-end gap-2 !w-fit"
              iconComponent={
                <ArrowIcon className="rotate-180 h-4 w-4 lg:h-5 lg:w-5 text-white" />
              }
            >
              <span className="text-white text-sm lg:text-base font-medium leading-[25px] text-start">
                Send Message{" "}
              </span>
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ContactForm;
