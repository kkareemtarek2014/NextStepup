"use client";

import FormattedDate from "../UI/media/FormattedDate";
import SocialShare from "../UI/media/SocialShare";
import BlogContent from "../UI/media/BlogContent";
import Image from "next/image";
import Breadcrumbs from "../UI/common/Breadcrumbs";

export default function SingleMedia() {
  const breadcrumbsList = [
    {
      title: "home",
      link: "/",
      pointerEvents: true,
    },
    {
      title: "Media Center",
      link: "/media",
      pointerEvents: true,
    },
    {
      title: "Media Center",
      pointerEvents: false,
    },
  ];

  return (
    <section className="relative h-fit bg-white">
      <div className="pt-[48px] pb-8 md:pt-[60px] lg:pt-[72px] lg:pb-[100px] px-4 md:px-10 flex flex-col relative mt-[100px] lg:mt-[120px]">
        <div className="max-w-[776px] mx-auto w-full flex flex-col gap-6 lg:gap-[40px]">
          <Breadcrumbs list={breadcrumbsList} />
          <div className="flex flex-col gap-3">
            <FormattedDate
            // date={new Date(blogData.publishedAt)}
            // content={blogData.Content}
            />
            <h1 className="text-2xl md:text-4xl lg:text-[64px] font-medium text-black leading-normal lg:leading-[80px] tracking-[0.5%]">
              {/* {blogData.Title} */}
            </h1>
            <p className="text-xl font-medium text-black">
              {/* {blogData.Description} */}
            </p>
          </div>
          {/* <SocialShare slug={blogData.slug} title={blogData.Title} widthFull /> */}
        </div>

        <div className="h-[186.01px] lg:h-[750px] relative pb-[4px] mt-[44px] lg:mt-[72px] lg:pb-[100px]">
          <Image
            src={`${process.env.NEXT_PUBLIC_IMAGES_DOMAIN}`}
            alt={""}
            fill
            className="w-full h-[400px] lg:h-[750px] !relative object-cover"
          />
        </div>

        <div className="blog-content">
          {/* <BlogContent content={blogData.Content} /> */}
        </div>

        <div className="max-w-[776px] mx-auto w-full mt-8 social-share">
          {/* <SocialShare slug={blogData.slug} title={blogData.Title} /> */}
        </div>
      </div>
    </section>
  );
}
