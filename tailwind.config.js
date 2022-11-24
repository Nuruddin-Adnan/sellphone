/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'blue': '#2874F0',
        'lightblue': '#0F99D6'
      }
    },
    container: {
      center: true,
      padding: '1rem'
    },
  },
  plugins: [require("daisyui")],
}
