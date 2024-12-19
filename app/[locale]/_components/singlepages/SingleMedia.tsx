import DiscoverSection from "../UI/General/DiscoverSection";
import GetintouchSection from "../UI/General/GetintouchSection";
import Breadcrumbs from "../UI/General/Breadcrumbs";
import BlogContent from "../UI/media/BlogContent";
import FormattedDate from "../UI/media/FormattedDate";
import Image from "next/image";
import SocialShare from "../UI/media/SocialShare";

export const runtime = "edge";

// Mock data for demonstration
const mockMediaData = {
  attributes: {
    Title: "G Developments launches Seashell Ras El Hekma",
    Description:
      "The first fully-integrated coastal resort at the heart of the North Coast’s Ras El Hekma.",
    Content: [
      {
        type: "heading",
        level: 2,
        children: [{ type: "text", text: "Headline" }],
      },
      {
        type: "paragraph",
        children: [
          {
            type: "text",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          },
        ],
      },
      {
        type: "image",
        image: {
          url: "/img/ProjectExample.svg",
          alternativeText: "Project Image",
        },
      },
      {
        type: "paragraph",
        children: [
          {
            type: "text",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          },
        ],
      },
      {
        type: "paragraph",
        children: [
          {
            type: "text",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          },
        ],
      },

      {
        type: "paragraph",
        children: Array(5).fill({
          type: "text",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        }),
      },
    ],
    publishedAt: new Date().toISOString(),
    image: {
      url: "/img/blog1.svg",
      alternativeText: "Sample Image",
    },
  },
};

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
    title: mockMediaData.attributes.Title,
    pointerEvents: false,
  },
];

export default function SingleMedia() {
  return (
    <section className="relative h-fit bg-white">
      <div className="pt-[48px] pb-8 md:pt-[60px] lg:pt-[72px] lg:pb-[100px] px-4 md:px-10 flex flex-col relative mt-[100px] lg:mt-[120px]">
        <div className="max-w-[776px] mx-auto w-full flex flex-col gap-6     lg:gap-[40px]">
          <Breadcrumbs list={breadcrumbsList} />
          <div className="flex flex-col gap-3">
            <FormattedDate
              date={new Date(mockMediaData.attributes.publishedAt)}
              content={mockMediaData.attributes.Content}
            />
            <h1 className="text-2xl md:text-4xl lg:text-[64px] font-medium text-black leading-normal lg:leading-[80px] tracking-[0.5%]">
              {mockMediaData.attributes.Title}
            </h1>
            <p className="text-xl font-medium text-black">
              {mockMediaData.attributes.Description}
            </p>
          </div>
          <SocialShare
            slug={"Sample Media Title"}
            title={mockMediaData.attributes.Title}
            widthFull
          />
        </div>

        <div className=" h-[186.01px] lg:h-[750px] relative pb-[4px]  mt-[44px]  lg:mt-[72px]">
          <Image
            src={mockMediaData.attributes.image.url}
            alt={mockMediaData.attributes.image.alternativeText}
            fill
            className="w-full    h-[400px] lg:h-[750px] !relative "
          />
        </div>
        <div className="mx-w-[776px] mx-auto justify-start flex flex-col gap-[32px]">
          <BlogContent content={mockMediaData.attributes.Content} />
          <SocialShare
            slug={"Sample Media Title"}
            title={mockMediaData.attributes.Title}
          />
        </div>
      </div>

      <DiscoverSection />
      <GetintouchSection />
    </section>
  );
}
