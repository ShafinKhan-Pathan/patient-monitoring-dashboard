/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "#f4f7f1",
        ink: "#17301f",
        accent: "#2f6b47",
        accentSoft: "#d9eadc",
        warn: "#d7a229",
        danger: "#c84d4d",
      },
      boxShadow: {
        panel: "0 18px 45px rgba(23, 48, 31, 0.10)",
      },
      fontFamily: {
        sans: ["Segoe UI", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
