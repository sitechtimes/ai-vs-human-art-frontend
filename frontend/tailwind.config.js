/** @type {import('tailwindcss').Config} */
export default {
  content: [

    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'home-page': "url('/concept1.png')",
      }
    },
  },
  plugins: [require('tailwindcss-primeui')],
}

