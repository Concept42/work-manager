/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#374750',
        secondary: '#263238',
        font: '#CFD8DC',
        accent: '#64B5F6',
      },
      fontFamily: {
        nunito: ['nunito', 'sans-serif'],
      },
    },
  },

  plugins: [],
}
