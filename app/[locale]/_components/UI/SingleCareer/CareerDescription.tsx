"use client";
import { useLocale } from "next-intl";
import Breadcrumb from "../General/Breadcrumbs";
import ArrowIcon from "../../Icons/ArrowIcon";
import Button from "../General/Button";
import { Link } from "@/navigation";
export default function CareerDescription() {
  const TheJobDescription = [
    {
      id: 1,
      title: "About the role",
      Description: [
        {
          type: "paragraph",
          children: [
            {
              text: "As a Site Engineer, you will play a pivotal role in ensuring the successful on-site execution of our projects. This position requires a hands-on professional who can lead construction activities, monitor quality standards, and ensure adherence to safety protocols. You’ll work closely with the project management team and subcontractors, translating plans into results while upholding [Company Name]'s commitment to quality and excellence.",
            },
          ],
        },
      ],
    },
    {
      id: 2,
      title: "What you’ll do",
      Description: [
        {
          type: "list",
          children: [
            {
              children: [
                {
                  text: "Oversee daily on-site activities, ensuring work aligns with the project’s timeline, quality standards, and safety protocols.",
                },
              ],
            },
            {
              children: [
                {
                  text: "Coordinate and supervise subcontractors, suppliers, and on-site workers to maintain workflow and resolve any issues promptly.",
                },
              ],
            },
            {
              children: [
                {
                  text: "Conduct regular inspections of construction work, ensuring compliance with design specifications and project requirements.",
                },
              ],
            },
            {
              children: [
                {
                  text: "Collaborate with architects, designers, and the project management team to interpret plans and make necessary adjustments.",
                },
              ],
            },
            {
              children: [
                {
                  text: "Prepare and present site reports, manage documentation, and communicate progress to the Project Manager.",
                },
              ],
            },

            {
              children: [
                {
                  text: "Monitor and enforce safety procedures, identifying any risks and implementing corrective measures as needed.",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 3,
      title: "Who are we looking for",
      Description: [
        {
          type: "list",
          children: [
            {
              children: [
                {
                  text: "Bachelor’s degree in Civil Engineering, Construction Management, or a related field.",
                },
              ],
            },
            {
              children: [
                {
                  text: "3+ years of experience as a Site Engineer or in a similar role within the construction or real estate industry.",
                },
              ],
            },
            {
              children: [
                {
                  text: "Strong understanding of construction procedures, materials, and safety regulations.",
                },
              ],
            },
            {
              children: [
                {
                  text: "Excellent problem-solving abilities and attention to detail.",
                },
              ],
            },
            {
              children: [
                {
                  text: "Proficient in construction software and tools (AutoCAD, MS Project, etc.).",
                },
              ],
            },
            {
              children: [
                {
                  text: "Exceptional communication and leadership skills, with the ability to manage teams effectively.",
                },
              ],
            },
          ],
        },
      ],
    },
  ];
  const locale = useLocale();

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-[40px] lg:gap-[64px]">
      <div className="flex flex-col gap-[40px] lg:gap-[64px]">
        {TheJobDescription?.map((section: any, sectionIndex: number) => (
          <div key={section.id} className={`  `}>
            <div className="gap-6 flex flex-col">
              <h3
                className={`text-2xl lg:text-[32px] leading-7 text-black font-medium pb-[10px] text-pretty `}
              >
                {section.title}
              </h3>

              {section.Description?.map((desc: any, index: number) => {
                if (desc.type === "paragraph") {
                  return (
                    <p
                      key={index}
                      className={`text-black text-sm lg:text-base font-semimedium text-pretty `}
                    >
                      {desc?.children?.[0]?.text || ""}
                    </p>
                  );
                } else if (desc.type === "list") {
                  return (
                    <ul
                      key={index}
                      className={`list-disc ms-[19px] text-sm lg:text-base font-semimedium small-square-list`}
                    >
                      {desc?.children?.map((item: any, itemIndex: number) => (
                        <li
                          key={itemIndex}
                          className="text-black  text-sm lg:text-base font-semimedium text-pretty"
                        >
                          {item?.children?.[0]?.text || ""}
                        </li>
                      ))}
                    </ul>
                  );
                } else {
                  return null;
                }
              })}
            </div>
          </div>
        ))}
        <Button
          href={`/${locale}`}
          className="px-5 py-3 bg-black hover:bg-black/70 transition-all duration-300 rounded-[100px] h-fit text-nowrap flex items-center justify-center gap-2 !w-fit"
          iconComponent={
            <ArrowIcon className="rotate-180 h-4 w-4 lg:h-5 lg:w-5 text-white" />
          }
        >
          <span className="text-white text-sm lg:text-base font-medium leading-[25px] text-start">
            Apply Now
          </span>
        </Button>
      </div>
      <img
        src="/careerimage.svg"
        alt="career"
        className="h-[240px] w-full object-cover lg:h-[400px] lg:w-[584px]"
      />
    </div>
  );
}
