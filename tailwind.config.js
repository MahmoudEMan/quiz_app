/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        zoomOut: {
          "0%": { transform: "scale(0)" },
          "100%": { transform: "scale(3)" },
        },
      },
    },
  },
  plugins: [],
};
