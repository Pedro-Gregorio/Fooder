/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        meals: "repeat(auto-fit, minmax(20rem, 1fr));",
      },
      fontFamily: {
        sans: ["Lato", "sans-serif"],
      },
      colors: {
        primary: "#27374D",
        secondary: "#526D82",
        tertiary: "#9DB2BF",
        accent: "#DDE6ED",
      },
    },
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
  },
  plugins: [],
};
