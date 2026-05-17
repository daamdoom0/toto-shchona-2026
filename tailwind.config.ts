import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Retro Israeli Toto base
        toto: {
          green: "#005A3C", // classic deep green
          "green-dark": "#003D27",
          "green-light": "#0E7A52",
          paper: "#F5F1E5", // cream paper
          ink: "#1A1A1A",
          stamp: "#C8102E", // ink red
        },
        // USA Mundial accents
        usa: {
          red: "#BF0A30",
          blue: "#002868",
          gold: "#FFB81C", // World Cup gold
        },
      },
      fontFamily: {
        display: ['"Suez One"', "serif"],
        body: ['"Heebo"', "system-ui", "sans-serif"],
        mono: ['"Space Mono"', "monospace"],
        stamp: ['"Bebas Neue"', "sans-serif"],
      },
      boxShadow: {
        "toto-cell": "inset 0 -3px 0 rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.4)",
        "stamp": "2px 2px 0 rgba(0,0,0,0.85)",
      },
      backgroundImage: {
        "paper-grain":
          "radial-gradient(circle at 25% 25%, rgba(0,0,0,0.025) 1px, transparent 1px), radial-gradient(circle at 75% 75%, rgba(0,0,0,0.025) 1px, transparent 1px)",
      },
      animation: {
        "stamp-in": "stampIn 0.25s cubic-bezier(0.4, 1.4, 0.6, 1)",
        "wobble": "wobble 0.5s ease-in-out",
        "fade-up": "fadeUp 0.4s ease-out",
      },
      keyframes: {
        stampIn: {
          "0%": { transform: "scale(2.5) rotate(-12deg)", opacity: "0" },
          "100%": { transform: "scale(1) rotate(-4deg)", opacity: "1" },
        },
        wobble: {
          "0%,100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(-3deg)" },
          "75%": { transform: "rotate(3deg)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
