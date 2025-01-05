"use client";

import Image from "next/image";
import { ContentBlock, ContentChild } from "@/app/[locale]/types/media";

interface BlogContentProps {
  content: ContentBlock[];
}

const BlogContent = ({ content }: BlogContentProps) => {
  const renderChildren = (children: ContentChild[]) => {
    return children.map((child, index) => {
      if (child.type === "link") {
        return (
          <a
            key={index}
            href={child.url}
            className="text-black underline hover:text-primary transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            {child.text}
          </a>
        );
      }
      return <span key={index}>{child.text}</span>;
    });
  };

  return (
    <article className="w-full max-w-[776px] mx-auto">
      {content?.map((block, index) => {
        switch (block.type) {
          case "heading":
            const headingClasses = {
              1: "text-4xl md:text-5xl lg:text-[64px] leading-tight",
              2: "text-3xl md:text-4xl lg:text-[40px] leading-tight",
              3: "text-2xl md:text-3xl lg:text-[28px] leading-tight",
              4: "text-xl md:text-2xl lg:text-[24px] leading-tight",
            }[block.level || 2];

            return (
              <h2
                key={index}
                className={`${headingClasses} font-medium text-black mb-6 md:mb-8`}
              >
                {renderChildren(block.children)}
              </h2>
            );

          case "paragraph":
            return (
              <p
                key={index}
                className="text-base md:text-lg text-black leading-relaxed mb-6"
              >
                {renderChildren(block.children)}
              </p>
            );

          case "image":
            if (!block.image) return null;
            return (
              <figure key={index} className="mb-8 md:mb-12">
                <Image
                  src={`${block.image.url}`}
                  alt={block.image.alternativeText || ""}
                  width={776}
                  height={434}
                  className="w-full h-auto object-cover rounded-lg"
                  priority={index === 0}
                />
              </figure>
            );

          case "quote":
            return (
              <blockquote
                key={index}
                className="text-xl md:text-2xl lg:text-[28px] font-medium leading-[35px]  text-black py-6 lg:py-[48px]  rounded-lg mb-8 md:mb-12"
              >
                {renderChildren(block.children)}
              </blockquote>
            );

          default:
            return null;
        }
      })}
    </article>
  );
};

export default BlogContent;
