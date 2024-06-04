/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeOut: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-in-out",
        fadeOut: "fadeOut 0.5s ease-in-out",
      },
      colors: {
        lightGreen: "#009d4f",
        darkGreen: "#005850",
        lightGray: "#cfd2d3",
      },
    },
    fontFamily: {
      sans: ["Roboto", "sans-serif"],
      serif: ["Roboto Slab", "serif"],
    },
  },
  plugins: [
    function ({ addUtilities, e }) {
      addUtilities(
        {
          ".hover-border-b::after": {
            content: '""',
            display: "block",
            position: "absolute",
            bottom: "-32px",
            left: "0",
            width: "100%",
            height: "6px",
            backgroundColor: "#009d4f",
            transform: "scaleX(0)",
            transition: "transform 0.3s ease",
          },
          ".hover-border-b:hover::after": {
            transform: "scaleX(1)",
          },
        },
        ["responsive", "hover"]
      );
    },
  ],
};
