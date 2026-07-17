import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        void:     "#04060f",
        "void-2": "#060916",
        violet: {
          400: "#c084fc",
          500: "#a78bfa",
          600: "#9061f9",
        },
        teal: {
          400: "#2dd4bf",
          500: "#14b8a6",
        },
        sky: {
          300: "#7dd3fc",
        },
        glass: "rgba(16,12,34,0.85)",
      },
      fontFamily: {
        sans: ["Space Grotesk", "system-ui", "sans-serif"],
      },
      animation: {
        "flow":      "flow 7s linear infinite",
        "shimmer":   "shimmer 6s linear infinite",
        "pulse-glow":"pulse-glow 2s ease-in-out infinite",
        "bob":       "bob 5s ease-in-out infinite",
        "marquee":   "marquee 25s linear infinite",
        "marquee-r": "marquee 30s linear infinite reverse",
      },
      keyframes: {
        flow: {
          "0%":   { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "300% 50%" },
        },
        shimmer: {
          to: { backgroundPosition: "200% center" },
        },
        "pulse-glow": {
          "0%,100%": { opacity: "1", transform: "scale(1)" },
          "50%":     { opacity: "0.4", transform: "scale(0.65)" },
        },
        bob: {
          "0%,100%": { transform: "translateY(0)" },
          "50%":     { transform: "translateY(-8px)" },
        },
        marquee: {
          "0%":   { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      backgroundImage: {
        "grad-v": "linear-gradient(90deg, #a78bfa, #c084fc)",
        "grad-vt": "linear-gradient(90deg, #a78bfa, #c084fc, #7dd3fc)",
        "grad-t": "linear-gradient(90deg, #2dd4bf, #7dd3fc)",
      },
    },
  },
  plugins: [],
};
export default config;
