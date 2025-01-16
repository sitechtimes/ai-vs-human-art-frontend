/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    screens: {
      portrait: {
        raw: '(orientation: portrait)'
      },
      landscape: {
        raw: '(orientation: landscape)'
      }
    }
  },
  plugins: [require('tailwindcss-primeui')],
  darkMode: ['selector']
}
