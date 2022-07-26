/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  purge: [
    "./components/**/*.{vue,js}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  media: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      'great-vibes': ['GreatVibes', 'sans-serif'],
      'josefin-sans': ['JosefinSans', 'sans-serif'],
    },
    colors: {
      'light-green': '#CCFFC8',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};