"use client";
import {
  InstapaperShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from "next-share";
import Image from "next/image";

import { useLocale } from "next-intl";

const SocialShare = ({
  slug,
  widthFull,
  title,
}: {
  slug: string;
  widthFull?: boolean;
  title: string;
}) => {
  const locale = useLocale();

  const shareUrl = `https://g-developments.pages.dev/${locale}/blogs/${slug}`;

  return (
    <div className={` ${widthFull ? " w-full lg:w-fit" : "w-fit"} `}>
      <div className="flex items-center gap-6 w-full lg:w-fit justify-between lg:justify-start">
        <span className="text-[#AAAAAA]   text-xs">SHARE</span>
        <div className="flex items-center gap-2">
          <div className=" w-[44px] h-[44px] rounded-[12px]  ">
            <LinkedinShareButton url={shareUrl} title={title} blankTarget>
              <div className=" w-[44px] h-[44px]   flex justify-center  hover:opacity-50 items-center">
                <Image src="/img/linkedIn.svg" alt="" width={24} height={24} />{" "}
              </div>
            </LinkedinShareButton>
          </div>
          <InstapaperShareButton url={shareUrl} title={title} blankTarget>
            <div className=" w-[44px] h-[44px]   flex justify-center  hover:opacity-50 items-center">
              <Image src="/img/instagram.svg" alt="" width={24} height={24} />{" "}
            </div>
          </InstapaperShareButton>
          <TwitterShareButton url={shareUrl} title={title} blankTarget>
            <div className=" w-[44px] h-[44px]   flex justify-center  hover:opacity-50 items-center">
              <Image src="/img/x.svg" alt="" width={24} height={24} />{" "}
            </div>
          </TwitterShareButton>
        </div>
      </div>
    </div>
  );
};

export default SocialShare;
