/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    fontFamily: {
      'great-vibes': ['GreatVibes', 'sans-serif'],
      'josefin-sans': ['JosefinSans', 'sans-serif'],
    },
    extend: {
      colors: {
        'light-green': '#CCFFC8',
        'strong-green': '#2DCF3D',
        'light-gray': '#DCDCDC',
        'gray': '#494949',
      },
      boxShadow: {
        'contour': 'inset 0px 0px 2px 1px rgb(0 0 0 / 0.05)'
      }
    }
  },
  plugins: [],
  darkMode: 'class'
}
