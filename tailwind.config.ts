import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0A101D",
          deep: "#05080F",
          light: "#111A2E",
        },
        navy: {
          DEFAULT: "#172238",
          dark: "#0F1829",
          light: "#223252",
        },
        paper: {
          DEFAULT: "#F7F8FA",
          card: "#FFFFFF",
          subtle: "#F0F2F6",
          border: "#E2E8F0",
        },
        accent: {
          DEFAULT: "#8AAEFF",
          soft: "#BBD2FF",
          vibrant: "#3B82F6",
          glow: "rgba(138, 174, 255, 0.25)",
        },
        muted: {
          DEFAULT: "#667389",
          light: "#94A3B8",
          dark: "#475569",
        },
      },
      fontFamily: {
        sans: ["Peyda", "system-ui", "-apple-system", "sans-serif"],
        editorial: ["Peyda", "serif"],
        mono: [
          "SFMono-Regular",
          "'JetBrains Mono'",
          "Menlo",
          "Consolas",
          "monospace",
        ],
      },
      maxWidth: {
        reading: "68ch",
      },
      lineHeight: {
        prose: "2.05",
      },
    },
  },
  plugins: [],
};

export default config;
