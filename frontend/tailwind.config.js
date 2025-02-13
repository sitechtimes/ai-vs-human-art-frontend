/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    screens: {
      ...defaultTheme.screens,

      portrait: {
        raw: '(orientation: portrait)'
      },
      landscape: {
        raw: '(orientation: landscape)'
      }
    }
  },
  plugins: [require('tailwindcss-primeui')],
  darkMode: ['selector'],
  future: {
    hoverOnlyWhenSupported: true
  }
}
