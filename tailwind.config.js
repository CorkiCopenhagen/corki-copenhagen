/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        sand: {
          50: "#faf7f2",
          100: "#f3ebe0",
          200: "#e8dcc8",
          300: "#d9c7a8",
          400: "#c4a882",
          500: "#a88962",
        },
        cork: {
          DEFAULT: "#8b7355",
          dark: "#5c4a38",
          muted: "#9a8570",
        },
        ink: {
          DEFAULT: "#632e19",
          muted: "#632e19",
        },
        tile: {
          soft: "#c5d4dc",
          muted: "#9eb0bc",
        },
      },
      fontFamily: {
        display: ['"Belleza"', "Georgia", "serif"],
        sans: ['"DM Sans"', "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 2px 24px rgba(61, 52, 41, 0.06)",
        card: "0 4px 32px rgba(61, 52, 41, 0.08)",
      },
      animation: {
        "fade-up": "fadeUp 0.7s ease-out forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
