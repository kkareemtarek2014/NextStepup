"use client";
import { useLocale } from "next-intl";
import ArrowIcon from "../../Icons/ArrowIcon";
import Button from "../General/Button";

interface TextBlock {
  text: string;
  type: string;
}

interface ContentBlock {
  type: string;
  format?: "unordered" | "ordered";
  level?: number;
  children: (TextBlock | { children: TextBlock[] })[];
}

interface CareerDescriptionProps {
  data: {
    data: Array<{
      Details: ContentBlock[];
      buttonLink?: string;
      buttonTitle?: string;
      Image?: {
        url: string;
        alternativeText: string;
      };
    }>;
  };
}

export default function CareerDescription({ data }: CareerDescriptionProps) {
  const locale = useLocale();
  const details = data.data[0].Details;

  const renderBlock = (block: ContentBlock) => {
    switch (block.type) {
      case "heading":
        const headingClass =
          block.level === 2
            ? "text-2xl lg:text-[32px] leading-7 text-black font-medium mb-[24px]"
            : "text-xl lg:text-[28px] leading-7 text-black font-medium mb-[24px]";

        return (
          <h3 className={`${headingClass} text-pretty`}>
            {"text" in block.children[0]
              ? block.children[0].text
              : block.children[0].children[0].text}
          </h3>
        );

      case "paragraph":
        const text =
          "text" in block.children[0]
            ? block.children[0].text
            : block.children[0].children[0].text;
        if (!text?.trim()) return null;
        return (
          <p className="text-black text-sm lg:text-base font-normal lg:font-semimedium text-pretty mb-[64px]">
            {text}
          </p>
        );

      case "list":
        return (
          <ul
            className={`
            ms-[19px] text-sm lg:text-base font-normal lg:font-semimedium mb-6 lg:mb-[64px]
            ${
              block.format === "ordered"
                ? "list-decimal"
                : "list-disc small-square-list"
            }
          `}
          >
            {block.children.map((item: any, index) => (
              <li
                key={index}
                className="text-black text-sm lg:text-base font-normal lg:font-semimedium text-pretty mb-2"
              >
                {item.children[0].text}
              </li>
            ))}
          </ul>
        );

      default:
        return null;
    }
  };

  if (!data?.data?.[0]) {
    return <div>No career data available</div>;
  }

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-[40px] lg:gap-[64px]">
      <div className="flex flex-col gap-[40px] lg:gap-0">
        {details.map((block, index) => (
          <div key={index} className="gap-6 flex flex-col">
            {renderBlock(block)}
          </div>
        ))}

        {data.data[0].buttonLink && (
          <Button
            href={data.data[0].buttonLink}
            className="px-5 py-3 bg-black hover:bg-black/70 transition-all duration-300 rounded-[100px] h-fit text-nowrap flex items-center justify-center gap-2 !w-fit"
            iconComponent={
              <ArrowIcon className="rotate-180 h-4 w-4 lg:h-5 lg:w-5 text-white" />
            }
          >
            <span className="text-white text-sm lg:text-base font-medium leading-[25px] text-start">
              {data.data[0].buttonTitle}
            </span>
          </Button>
        )}
      </div>
      {data.data[0].Image && (
        <img
          src={`${process.env.NEXT_PUBLIC_IMAGES_DOMAIN}${data.data[0].Image.url}`}
          alt={data.data[0].Image.alternativeText}
          className="h-[240px] w-full object-cover lg:h-[400px] lg:w-[584px]"
        />
      )}
    </div>
  );
}
