"use client";
import { m, LazyMotion, domAnimation } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  direction: "left" | "right";
  className?: string;
  delay?: number;
}

export default function AnimatedSection({
  children,
  direction,
  className = "",
  delay = 0,
}: AnimatedSectionProps) {
  const variants = {
    hidden: {
      opacity: 0,
      x: direction === "left" ? -50 : 50,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay,
      },
    },
  };

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        variants={variants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className={className}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
} 