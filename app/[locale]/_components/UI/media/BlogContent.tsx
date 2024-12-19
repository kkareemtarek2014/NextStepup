"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";

const BlogContent = ({ content }: { content: any }) => {
  const pathname = usePathname();
  const isTermsPage =
    pathname.includes("terms-conditions") ||
    pathname.includes("privacy-policy");

  const renderChildren = (children: any) => {
    return children.map((child: any, index: number) => {
      if (child.type === "link") {
        return (
          <a
            key={index}
            href={child.url}
            className="text-black"
            target="_blank"
            rel="noopener noreferrer"
          >
            {child.children.map((linkChild: any) =>
              linkChild.text ? linkChild.text : ""
            )}
          </a>
        );
      } else {
        return <span key={index}>{child.text}</span>;
      }
    });
  };

  return (
    <article className="w-full max-w-[776px] mx-auto ">
      {content?.map((item: any, index: number) => {
        const imgHeight =
          index === 0
            ? "h-[186px] sm:h-[300px] md:h-[400px] lg:h-[600px] xl:h-[800px]"
            : "h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] xl:h-[430px] mt-2 md:mt-8";

        return (
          <React.Fragment key={index}>
            {item.type === "image" && (
              <section
                className={`${
                  index === 0
                    ? "w-full"
                    : "max-w-full w-full md:w-[776px] mx-auto pb-5 sm:pb-6 md:pb-8 lg:pb-10"
                }`}
              >
                <Image
                  src={item.image.url}
                  alt={item.image.alternativeText}
                  height={434}
                  width={776}
                  priority
                  className={`w-full object-cover max-w-[776px] relative ${imgHeight}`}
                />
              </section>
            )}
            <section className="max-w-full w-full md:w-[776px] mx-auto text-black">
              {item.type === "heading" && item.children.length && (
                <>
                  {item.level === 2 && (
                    <h2 className="text-xl sm:text-2xl lg:text-[40px] mt-6 sm:mt-8 md:mt-20 mb-4 sm:mb-6 md:mb-12 font-medium leading-tight md:leading-[1.48]">
                      {renderChildren(item.children)}
                    </h2>
                  )}
                  {item.level === 3 && (
                    <h3
                      className={`text-xl sm:text-2xl md:text-[40px] ${
                        isTermsPage ? "md:mt-0" : "mt-6 sm:mt-8 md:mt-20"
                      } mb-4 sm:mb-6 md:mb-12 font-medium leading-tight md:leading-[1.48]`}
                    >
                      {renderChildren(item.children)}
                    </h3>
                  )}
                  {item.level === 4 && (
                    <h4 className="text-xl lg:text-[40px] mt-6 md:mt-16 mb-4 md:mb-7 text-black font-medium    leading-[22px] md:leading-[48px] text-pretty">
                      {renderChildren(item.children)}
                    </h4>
                  )}
                  {item.level === 5 && (
                    <h5 className="text-lg md:text-3xl mt-4 md:mt-5 mb-3  text-black font-medium    leading-[18px] md:leading-[36px] text-pretty">
                      {renderChildren(item.children)}
                    </h5>
                  )}
                </>
              )}
              {item.type === "paragraph" &&
                item.children.some((child: any) => child.text.trim()) && (
                  <p
                    className={`text-sm sm:text-base font-normal lg:font-semimedium leading-relaxed ${
                      isTermsPage
                        ? "pb-6 sm:pb-8 md:pb-10"
                        : "pb-8 sm:pb-10 md:pb-12"
                    }`}
                  >
                    {renderChildren(item.children)}
                  </p>
                )}
              {item.type === "list" && item.children.length > 0 && (
                <ul
                  className={`pb-8 sm:pb-10 md:pb-12 list-inside space-y-2 sm:space-y-3 ${
                    item.format === "unordered" ? "list-disc" : "list-decimal"
                  }`}
                >
                  {item.children.map((listItem: any, index: number) => (
                    <li
                      key={index}
                      className={`${
                        item.children.length - 1 === index
                          ? "font-dm"
                          : "mb-2 font-dm"
                      }`}
                    >
                      {renderChildren(listItem.children)}
                    </li>
                  ))}
                </ul>
              )}
              {item.type === "quote" && item.children[0]?.text.trim() && (
                <blockquote className="text-base sm:text-lg md:text-[28px] leading-relaxed md:leading-9 pb-8 sm:pb-10 md:pb-12">
                  {renderChildren(item.children)}
                </blockquote>
              )}
            </section>
          </React.Fragment>
        );
      })}
    </article>
  );
};

export default BlogContent;
