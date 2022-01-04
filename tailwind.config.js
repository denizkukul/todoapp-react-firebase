module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      '4xs': '300px',
      '3xs': '380px',
      '2xs': '420px',
      'xs': '480px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'tall': { 'raw': '(min-height: 650px)' }
    },
    extend: {
      colors: {
        'color-000': '#FFFFFF',
        'color-100': '#EEEEEE',
        'color-200': '#DDDDDD',
        'color-300': '#CCCCCC',
        'color-400': '#BBBBBB',
        'color-500': '#AAAAAA',
        'color-600': '#777777',
        'color-700': '#555555',
        'color-800': '#333333',
        'color-900': '#000000',
      },
      fontFamily: {
        'sans': ['roboto', 'ui-sans-serif', 'system-ui']
      },
    },
  },
  plugins: [],
}