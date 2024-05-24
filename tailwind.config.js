/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "custom-gradient": "linear-gradient(to right, #fb7185, #ef4444)",
      },
    },
    colors: {
      fontwhite: "#FAF9F6",
      black: "#000000",
      lessblack: "#181818",
      lightred: "linear-gradient(to right, #fb7185, #ef4444)",
      lightgrey: "#576574",
    },
  },
  plugins: [],
};
