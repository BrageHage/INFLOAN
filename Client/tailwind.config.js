/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        lightGreen: "#009d4f",
        darkGreen: "#005850",
        lightGray: "#cfd2d3",
      },
    },
  },
  plugins: [],
};
