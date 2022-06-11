/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.tsx',
    './src/components/**/*.tsx'
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Poppins']
      }
    },
  },
  plugins: [],
}
