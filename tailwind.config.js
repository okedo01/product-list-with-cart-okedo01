/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}"],
  theme: {
    extend: {
      maxWidth: {
        1400: '1400px'
      },
      width: {
        1000: '1000px',
        400: '400px'
      },
      maxHeight: {
        470: '470px'
      },
      colors: {
        primary: 'hsl(14, 86%, 42%)',
        secondary: 'hsl(159, 69%, 38%)',
        rose50: 'hsl(20, 50%, 98%)',
        rose100: 'hsl(13, 31%, 94%)',
        rose300: 'hsl(14, 25%, 72%)',
        rose400: 'hsl(7, 20%, 60%)',
        rose500: 'hsl(12, 20%, 44%)',
        rose900: 'hsl(14, 65%, 9%)'
      },
      fontSize: {
        names: '16px'
      },
      fontFamily: {
        text: 'Hanken Grotesk, serif'
      },
      spacing: {
        430: '430px'
      }
    },
  },
  plugins: [],
}

