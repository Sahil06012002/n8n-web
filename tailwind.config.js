/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        secondary: {
          default: "#a91414ff",
          light: "#404040",
          dark: "#171717",
        },
      },
    },
  },
  plugins: [],
};
