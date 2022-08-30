const withMT = require('@material-tailwind/react/utils/withMT')

module.exports = {
  daisyui: {
    themes: [
      {
        myTheme: {
          primary: '#4E83FD',
          secondary: '#0361ba',
          accent: '#3d94c6',
          neutral: '#2A2938',
          'base-100': '#F1F5FA',
          info: '#6A99F6',
          success: '#82E3DB',
          warning: '#FCA52C',
          error: '#E94B3A',
          font: '#1761fd',
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
        accent: '#4E83FD',
        buttonText: 'ffffff',
      },
      fontFamily: {
        nunito: 'Nunito',
      },
    },
  },
}
