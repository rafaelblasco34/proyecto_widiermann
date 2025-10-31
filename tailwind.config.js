/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0d2859',
        secondary: '#737373',
        white: '#fdfdfd',
        success: '#22c55e',
        warning: '#f5930b',
        error: '#ef4444',
        policeYellow: '#f4d03f',
        darkBlue: '#0d2859',
        elegantYellow: '#f4d03f',
      },
      fontFamily: {
        'heading': ['"Times New Roman"', 'serif'],
        'body': ['"Bree Serif"', 'serif'],
      },
    },
  },
  plugins: [],
}