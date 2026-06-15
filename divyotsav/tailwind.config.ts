import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "var(--cream)",
        obsidian: "var(--obsidian)",
        gold: "var(--gold)",
        burgundy: "var(--burgundy)",
        "warm-gray": "var(--warm-gray)",
        "border-custom": "var(--border)",
        "cream-dark": "var(--cream-dark)",
      },
      fontFamily: {
        cormorant: ["var(--font-cormorant)", "serif"],
        jost: ["var(--font-jost)", "sans-serif"],
        devanagari: ["var(--font-devanagari)", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;
