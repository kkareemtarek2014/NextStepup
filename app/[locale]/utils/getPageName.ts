"use client";

export const getPageName = (pathname: string): string => {
  if (pathname === "/") return "G Developments";

  const path = pathname.split("/").pop() || "";

  // Helper function to capitalize first letter of each word
  const toTitleCase = (str: string): string => {
    return str
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  switch (path) {
    case "about-us":
      return "About Us";
    case "community":
      return "Communities";
    case "career":
      return "Careers";
    case "contact-us":
      return "Contact Us";
    case "media":
      return "Media Center";
    case "faqs":
      return "FAQs";
    default:
      return toTitleCase(path);
  }
};
