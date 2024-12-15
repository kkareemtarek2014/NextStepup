import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Helvetica", "sans-serif"],
      },
      colors: {
        primary: "#777777",
        background: "var(--background)",
        foreground: "var(--foreground)",
        menuColor: "#F5F5F5",
        teamColor: "#F6F6F6",
        borderColor: "#EAEAEA",
        newRed: "#B50542",
        carrerColor: "#969696",
      },
      fontWeight: {
        light: "300",
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        semimedium: "325",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
} satisfies Config;
