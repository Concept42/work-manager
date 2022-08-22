const withMT = require('@material-tailwind/react/utils/withMT')

module.exports = withMT({
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
        fontGray: '#90a4ae',
        accent: '#64B5F6',
      },
      fontFamily: {
        nunito: 'Nunito',
      },
    },
  },

  plugins: [],
})
