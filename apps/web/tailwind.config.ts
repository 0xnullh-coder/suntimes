import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        suntimes: {
          gold: "#F5A623",
          teal: "#0D7377",
          sand: "#FFF8F0",
          charcoal: "#2D2D2D",
          coral: "#FF6B6B",
          "light-teal": "#E8F4F4",
        },
      },
      fontFamily: {
        heading: ["Playfair Display", "serif"],
        body: ["DM Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
