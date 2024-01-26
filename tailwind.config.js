/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "dark-gradient":
          " linear-gradient(195deg, #161220 33.66%, #6F609B 96.84%)",
        "light-gradient": "linear-gradient(195deg, #8965F0 1.81%, #FFF 96.84%)",
      },
    },

    fontFamily: {
      indie: ["Indie Flower", "cursive"],
    },
  },
  plugins: [],
};
