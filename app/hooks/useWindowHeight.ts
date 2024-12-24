"use client";
import { useState, useEffect } from "react";

export const useWindowHeight = (): number => {
  const [windowHeight, setWindowHeight] = useState<number>(0);

  useEffect(() => {
    // Set initial height
    setWindowHeight(window.innerHeight);

    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowHeight;
};
