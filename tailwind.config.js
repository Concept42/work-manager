const withMT = require('@material-tailwind/react/utils/withMT')

module.exports = {
  daisyui: {
    themes: [
      {
        myTheme: {
          primary: '#F1F5FA',
          secondary: '#F1F5FA',
          accent: '#F1F5FA',
          primary: '#f7b5a3',
          secondary: '#0361ba',
          accent: '#3d94c6',
          neutral: '#2A2938',
          'base-100': '#F1F5FA',
          info: '#6A99F6',
          success: '#82E3DB',
          warning: '#FCA52C',
          error: '#E94B3A',
        },
      },
    ],
  },
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
