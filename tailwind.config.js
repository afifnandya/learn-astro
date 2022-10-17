module.exports = {
  content: [
    "./src/components/stories/*.story",
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",

      black: "#000",
      white: "#fff",

      gray: {
        light: "#cfcfd2",
        dark: "#707070",
        100: "#f7fafc",
        200: "#edf2f7",
        300: "#e2e8f0",
        400: "#cbd5e0",
        500: "#a0aec0",
        600: "#718096",
        700: "#4a5568",
        800: "#2d3748",
        900: "#1a202c",
      },
      red: {
        dark: "#df252a",
        light: "#f48285",
        pink: "#fcdede",
      },
      green: "#4CAF50",
      blue: {
        100: "#ebf8ff",
        200: "#bee3f8",
        300: "#90cdf4",
        400: "#63b3ed",
        500: "#4299e1",
        600: "#3182ce",
        700: "#2b6cb0",
        800: "#2c5282",
        900: "#2a4365",
      },
      yellow: {
        100: "#fffff0",
        200: "#fefcbf",
        300: "#faf089",
        400: "#f6e05e",
        500: "#ecc94b",
        600: "#d69e2e",
        700: "#b7791f",
        800: "#975a16",
        900: "#744210",
      },
    },
    extend: {
      ringWidth: {
        1: "1px",
      },
      zIndex: {
        "-1": "-1",
        49: "49",
        48: "48",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
      fontSize: {
        "3xs": "0.55rem",
        "2xs": "0.6rem",
      },
      lineHeight: {
        2: "0.5rem;",
      },
    },
  },
  plugins: [],
};
