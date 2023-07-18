/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["InterVariable", "Inter", ...defaultTheme.fontFamily.sans],
      },
    },
    colors: {
      primary: "rgb(178 168 151)",
      secondary: "rgb(60, 60, 60)",
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
