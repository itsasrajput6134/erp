/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"], // `purge` is now `content`
  theme: {
    extend: {
      colors: {
        black1: "#1f1f1f",
        black2: "#212121",
        black3: "#232323",
        black4: "#222222",
        black5: "#242424",
        gray1: "#f2f2f2",
      },
      purple: {
        500: '#6D28D9', // Primary Purple
        600: '#5B21B6', // Darker Purple (hover)
      },
      red: {
        600: '#DC2626', // Secondary Red
        700: '#B91C1C', // Darker Red (hover)
      },
      gray: {
        800: '#1F2937', // Background
        700: '#374151', // Card/Dropdown Background
        600: '#4B5563', // Borders
        500: '#6B7280', // Disabled Text
        300: '#F3F4F6', // Text
      },
    },
  },
  corePlugins: {
    preflight: false, // Keep this only if Bootstrap styles are conflicting
  },
  plugins: [],
};
