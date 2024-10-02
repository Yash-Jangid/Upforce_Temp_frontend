/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'primary': '#AE484A',
        'secondary': '#2C2F33',
        'tertiary': '#3B3F44',
        'quaternary': '#4C4F52',
        'quinary': '#5A5D5F',
        'senary': '#6B6E6F',

      },
      borderColor:{
        'primary': '#AE484A',
        'quinary': '#5A5D5F',
      }
    },
  },
  plugins: [],
}