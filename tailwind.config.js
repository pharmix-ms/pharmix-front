/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto-Regular"],
        "roboto-bold": ["Roboto-Bold"],
        "roboto-medium": ["Roboto-Medium"],
        "roboto-semibold": ["Roboto-SemiBold"],
      },
    },
  },
  plugins: [],
};
