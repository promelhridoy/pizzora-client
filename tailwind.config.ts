import type { Config } from "tailwindcss";
import { heroui } from "@heroui/react";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FBF3E7",
        ink: "#241C15",
        tomato: "#C1391F",
        crust: "#E8A94C",
        basil: "#4C6444",
      },
      fontFamily: {
        display: ["var(--font-fraunces)"],
        sans: ["var(--font-inter)"],
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};
export default config;