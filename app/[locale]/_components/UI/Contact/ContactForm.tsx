"use client";

import React, { useState } from "react";
import CustomSelect from "../General/CustomSelect";
import CustomInput from "../General/CustomInput";
import Button from "../General/Button";
import ArrowIcon from "../../Icons/ArrowIcon";
import Image from "next/image";
import { PhoneCodes } from "../General/PhoneCodes";

interface FormData {
  inquiryType: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneCode: string;
  phoneNumber: string;
  message: string;
}

const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    inquiryType: "inquiry",
    firstName: "",
    lastName: "",
    email: "",
    phoneCode: "EG (+20)",
    phoneNumber: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error" | "";
    message: string;
  }>({
    type: "",
    message: "",
  });

  const typeOptions = [
    { value: "inquiry", label: "Inquiry type" },
    { value: "news", label: "News" },
    { value: "events", label: "Events" },
  ] as const;

  const PhoneOptions = PhoneCodes;

  const handleInputChange =
    (name: keyof FormData) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({
        ...prev,
        [name]: event.target.value,
      }));
    };

  const handleSelectChange =
    (name: keyof FormData) => (value: string | string[]) => {
      setFormData((prev) => ({
        ...prev,
        [name]: typeof value === "string" ? value : value[0],
      }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      const salesforceData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phoneCode: formData.phoneCode,
        phoneNumber: formData.phoneNumber,
        message: formData.message,
        inquiryType: formData.inquiryType,
      };

      const response = await fetch("https://gdev.cloudhosta.com/api/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: salesforceData }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Server error:", errorData);
        throw new Error(errorData.error?.message || "Failed to submit form");
      }

      setStatus({
        type: "success",
        message: "Your message has been sent successfully!",
      });

      setFormData({
        inquiryType: "inquiry",
        firstName: "",
        lastName: "",
        email: "",
        phoneCode: "EG (+20)",
        phoneNumber: "",
        message: "",
      });
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Failed to send message. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setStatus({ type: "", message: "" });
    setFormData({
      inquiryType: "inquiry",
      firstName: "",
      lastName: "",
      email: "",
      phoneCode: "EG (+20)",
      phoneNumber: "",
      message: "",
    });
  };

  return (
    <div className="flex flex-col justify-center text-center items-center pt-[60px] px-4 lg:px-0 pb-[40px] lg:pb-[64px] bg-borderColor">
      {status.type === "success" ? (
        <div>
          <div className="flex flex-col text-center items-center gap-3 lg:gap-6 mb-4 lg:mb-16 ">
            <h1 className="text-black text-[25px] md:text-[40px] font-medium leading-[62px] md:leading-[50px]">
              Send ad Inquiry
            </h1>
            <p className="text-black text-xs md:text-base font-normal lg:font-semimedium max-w-[475px]">
              We'd love to hear from you, if you have any inquires please fill
              this form and we'll get in touch with you as soon as possible.
            </p>
          </div>
          <div className="flex flex-col items-center max-w-[784px] mx-auto w-full">
            <Image
              src="/img/Thanks.svg"
              alt="Thank you"
              width={96}
              height={96}
              className="mb-6"
            />
            <h2 className="text-black text-[25px] md:text-[40px] md:leading-[50px] font-medium mb-6">
              Thanks! We've got your message.
            </h2>
            <p className="text-black text-xs md:text-base font-normal lg:font-semimedium max-w-[475px] mb-6">
              We've received your message and our team will get in touch with
              you as soon as possible.
            </p>
            <Button
              onClick={resetForm}
              className="px-5 py-3 lg:py-6 w-full lg:w-fit lg:px-10 border border-black bg-transparent hover:bg-black/80 transition-all duration-300 rounded-[100px] hover:text-white text-black"
            >
              Send another message
            </Button>
          </div>{" "}
        </div>
      ) : (
        <>
          <div className="flex flex-col text-center items-center gap-3 lg:gap-6">
            <h1 className="text-black text-[25px] md:text-[40px] font-medium leading-[62px] md:leading-[50px]">
              Send ad Inquiry
            </h1>
            <p className="text-black text-xs md:text-base font-normal lg:font-semimedium max-w-[475px]">
              We'd love to hear from you, if you have any inquires please fill
              this form and we'll get in touch with you as soon as possible.
            </p>
          </div>
          <div className="max-w-[784px] mx-auto w-full">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-3 lg:gap-6 mt-[40px] lg:mt-16"
            >
              <CustomSelect
                options={typeOptions}
                value={formData.inquiryType}
                onChange={handleSelectChange("inquiryType")}
                bgColor="bg-white"
                size="medium"
                fullWidth
              />

              <div className="flex gap-4 w-full">
                <CustomInput
                  config={{
                    type: "text",
                    name: "firstName",
                    placeholder: "First name",
                    value: formData.firstName,
                    onChange: handleInputChange("firstName"),
                    required: true,
                  }}
                />
                <CustomInput
                  config={{
                    type: "text",
                    name: "lastName",
                    placeholder: "Last name",
                    value: formData.lastName,
                    onChange: handleInputChange("lastName"),
                    required: true,
                  }}
                />
              </div>

              <CustomInput
                config={{
                  type: "email",
                  name: "email",
                  placeholder: "Email address",
                  value: formData.email,
                  onChange: handleInputChange("email"),
                  required: true,
                }}
              />

              <div className="flex gap-4 w-full">
                <CustomSelect
                  options={PhoneOptions}
                  value={formData.phoneCode}
                  onChange={handleSelectChange("phoneCode")}
                  bgColor="bg-white"
                  size="medium"
                  height="max-h-[200px] h-fit lg:max-h-[400px] overflow-auto"
                  width="max-w-[140px] lg:!w-[140px] "
                />
                <CustomInput
                  config={{
                    type: "tel",
                    name: "phoneNumber",
                    placeholder: "Phone number",
                    value: formData.phoneNumber,
                    onChange: handleInputChange("phoneNumber"),
                    required: true,
                  }}
                />
              </div>

              <textarea
                name="message"
                placeholder="Add your message"
                value={formData.message}
                onChange={handleInputChange("message")}
                required
                className="form-field h-[112px] resize-none placeholder:!text-black font-normal lg:font-semimedium !text-black px-4 py-3 !border-bordercontact"
              />

              {status.message && (
                <div
                  className={`
                   
                      
                  text-black/90 text-center`}
                >
                  {status.message}
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="px-5 py-3 lg:py-6 lg:px-10 bg-black hover:bg-black/80 transition-all duration-300 rounded-[100px] h-fit text-nowrap flex items-center !self-end !justify-end gap-2 !w-fit"
                iconComponent={
                  <ArrowIcon className="rotate-180 h-4 w-4 lg:h-5 lg:w-5 text-white" />
                }
              >
                <span className="text-white text-sm lg:text-base font-medium leading-[25px] text-start">
                  {loading ? "Sending..." : "Send Message"}
                </span>
              </Button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default ContactForm;
