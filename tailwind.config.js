const withMT = require('@material-tailwind/react/utils/withMT')

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  plugins: [require('daisyui')],

  theme: {
    extend: {
      colors: {
        primary: '#EEF0F6',
        secondary: '#ffffff',
        font: '#414E74',
        fontGray: '#90a4ae',
        accent: '#1565C0',
        buttonText: 'ffffff',
      },
      fontFamily: {
        nunito: 'Nunito',
      },
    },
  },
}
