"use client";

export const getPageName = (pathname: string): string => {
  if (pathname === "/") return "G DEVELOPMENTS";

  // Remove locale and leading slash
  const path = pathname.split("/").pop() || "";

  // Convert path to display format
  switch (path) {
    case "about-us":
      return "ABOUT US";
    case "community":
      return "COMMUNITIES";
    case "career":
      return "CAREERS";
    case "contact-us":
      return "CONTACT US";
    case "media":
      return "MEDIA CENTER";
    case "faqs":
      return "FAQS";
    default:
      return path.toUpperCase().replace(/-/g, " ");
  }
};
