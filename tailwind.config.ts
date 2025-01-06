import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1512px",
    },
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
      keyframes: {
        "slide-up": {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        "slide-down": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(100%)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "slide-up": "slide-up 0.3s ease-out",
        "slide-down": "slide-down 0.3s ease-out",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
} satisfies Config;
