/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: '#8D8D8D',
        fadegray: '#484848',
      },
      backgroundColor: {
        blue: '#3980C0',
        fadewhite: '#F4F5F7',
      }
    },
  },
  plugins: [],
}