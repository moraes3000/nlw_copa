/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: "Roboto, sans-serif",
      },
      backgroundImage: {
        app: "url(/bg-effects.png)",
      },

      colors: {
        green: {
          500: "#129E57",
        },
        yellow: {
          500: "#F7DD43",
          700: "#F7DC43E0",
        },
        gray: {
          100: "#e1e1e6",
          500: "#8D8D99",
          600: "#323238",
          800: "#202024",
          900: "#121214",
        },
      },
    },
  },
  plugins: [],
};
