/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {
        colors: {
          primary: "#0b3d40",     // HopeHub's's primary dark green
          secondary: "#b9ff66",   // HopeHub's's neon green
          accent: "#0b4029",      // Lighter green for hover states
          background: "#f8f7e8",
          off_white: "#f8f7e8",
          dark_text: "#333",
          danger_red: "#E30613"
        },
        fontFamily: {
          sans: ["Inter", "sans-serif"]
        }
      },
    },
    plugins: [],
  }