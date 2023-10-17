/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    extend: {

      fontFamily: {
        jost: ["Jost", "sans-serif"],
        lexend: ["Lexend", "sans-serif"],
      },
      colors: {
        normalcolor: {
          100: "#4842f5",
          200: "#f54293",
        },
      },
    },
  },
  plugins: [ 
    require('tailwindcss-animations'),
  ]
};
