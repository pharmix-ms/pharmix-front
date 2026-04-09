/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    fontFamily: {
      montserrat: ["Montserrat-Regular"],
      "montserrat-bold": ["Montserrat-Bold"],
      "montserrat-medium": ["Montserrat-Medium"],
      "montserrat-semibold": ["Montserrat-SemiBold"],
    },
    extend: {
      colors: {
        // Gerais
        dark: "#040710",
        light: "#F8FAFC",

        // Cores Básicas
        primary: "#00B4D8",
        secondary: "#2EB88A",
        danger: "#E63946",
        warning: "#F4A261",

        // Texto
        brand: {
          primary: "#344051",
          secondary: "#637083",
          info: "#457B9D",
        },

        // Bordas
        border: {
          gray: "#CED2DA",
          darkGray: "#344051",
        },

        // Planos de Fundo (Backgrounds)
        bg: {
          light: "#F1F5F9",
          gray: "#CED2DA",
          info: "rgba(0, 180, 216, 0.1)", // #00B4D8 com 10% de opacidade
          safe: "rgba(46, 184, 138, 0.1)", // #2EB88A com 10% de opacidade
          warning: "rgba(254, 206, 169, 0.1)", // #FECEA9 com 10% de opacidade
        },
      },
    },
  },
  plugins: [],
};
