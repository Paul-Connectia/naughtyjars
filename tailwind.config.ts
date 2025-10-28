// tailwind.config.ts
import type { Config } from "tailwindcss";

export default {
  content: [
    "./index.html",
    "./src/components/StatsCircles.tsx",
    "./src/**/*.{js,ts,jsx,tsx}", // Adjust the path as per your project structure
  ],
  theme: {
    extend: {
      keyframes: {
        pop: {
          "0%": { transform: "scale(0)", opacity: "0" },
          "70%": { transform: "scale(1.1)", opacity: "1" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        pop: "pop 0.8s ease forwards",
        "fade-in": "fade-in 0.6s ease forwards",
      },
    },
  },
  plugins: [],
} satisfies Config;
