import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ], 
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#4f46e5",
        darkPrimary: "#818cf8",
        bgLight: "#f8f9fa",
        bgDark: "#0f172a",
      },
      backgroundImage: {
        "dark-gradient": "radial-gradient(circle, #0f172a 10%, #1e293b 90%)",
        "light-gradient": "linear-gradient(135deg, #f8f9fa 0%, #e2e8f0 100%)",
      },
    },
  },
  plugins: [],
} satisfies Config;
