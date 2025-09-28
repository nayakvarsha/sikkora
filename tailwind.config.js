/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        monastic: {
          gold: '#c97b46',
          red: '#8e3c1d',
          brown: '#5a3921',
          cream: '#f8f4e9',
          blue: '#e8f4f8'
        }
      },
      fontFamily: {
        serif: ['Noto Serif', 'serif'],
        sans: ['Open Sans', 'sans-serif']
      }
    },
  },
  plugins: [],
}