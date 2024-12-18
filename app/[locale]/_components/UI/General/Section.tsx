"use client";

import React from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Section = ({
  children,
  bgColor,
  py,
}: {
  children: React.ReactNode;
  bgColor?: string;
  py?: string;
}) => {
  return (
    <LazyMotion features={domAnimation}>
      <m.section
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`${bgColor || ""} ${py || ""}  overflow-clip`}
      >
        <div className="max-w-[1512px] mx-auto ">{children}</div>
      </m.section>
    </LazyMotion>
  );
};

export default Section;
