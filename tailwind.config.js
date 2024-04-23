/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        comet: {
          50: '#f6f7f9',
          100: '#ecedf2',
          200: '#d5d7e2',
          300: '#b0b6c9',
          400: '#868faa',
          500: '#677090',
          600: '#555d7c',
          700: '#434861',
          800: '#3a3f52',
          900: '#343746',
          950: '#22242f',
        },
      },
    },
  },
  plugins: [],
};
