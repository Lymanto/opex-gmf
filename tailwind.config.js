/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      fontSize: {
        h1: [
          "2.5rem",
          {
            lineHeight: "3.125rem",
            letterSpacing: "0.05em",
          },
        ],
        h2: [
          "2.25rem",
          {
            lineHeight: "2.875rem",
            letterSpacing: "0.05em",
          },
        ],
        h3: [
          "2rem",
          {
            lineHeight: "2.625rem",
            letterSpacing: "0.05em",
          },
        ],
        h4: [
          "1.75rem",
          {
            lineHeight: "2.375rem",
            letterSpacing: "0.05em",
          },
        ],
        h5: [
          "1.5rem",
          {
            lineHeight: "2.125rem",
            letterSpacing: "0.05em",
          },
        ],
        h6: [
          "1.25rem",
          {
            lineHeight: "1.875rem",
            letterSpacing: "0.05em",
          },
        ],
        subheading: [
          "1.125rem",
          {
            lineHeight: "1.75rem",
          },
        ],
        "p-lg": [
          "1rem",
          {
            lineHeight: "1.625rem",
          },
        ],
        "p-md": [
          "0.875rem",
          {
            lineHeight: "1.5rem",
          },
        ],
        "p-sm": [
          "0.75rem",
          {
            lineHeight: "1.375rem",
          },
        ],
        caption: [
          "0.625rem",
          {
            lineHeight: "1.25rem",
          },
        ],
      },
      colors: {
        primary: "#006298",
        secondary: "#84BD00",
      },
    },
  },
  plugins: [],
};
