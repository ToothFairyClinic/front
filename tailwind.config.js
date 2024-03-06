/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      spacing: {
        0.25: "0.063rem",
        0.5: "0.125rem",
        1.25: "0.3125rem",
        2.75: "0.6875rem",
        7.5: "1.875rem",
        15: "3.75rem",
        11: "2.75rem",
        19: "4.75rem",
        105: "26rem",
        112: "28rem",
        120: "30rem",
        140: "41rem",
        150: "44.25rem",
        175: "57.5rem",
        200: "75rem",
      },
      colors: {
        paleOlive: "#D9DBB3",
        lightBlue: "#D3E0E1",
        darkGray: "#333335",
        palePeach: "#FBF6F2",
      },
      borderWidth: {
        5: "5px",
        6: "6px",
      },
    },
  },

  plugins: [],
};
