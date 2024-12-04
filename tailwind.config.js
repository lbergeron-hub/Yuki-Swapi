/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,ts}'],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
      },
    },
    colors: {
      'slate-grey': '#2E2E2E',
      'deep-grey': '222222',
      'sw-yellow': ' #ffe81f',
    },
  },
  plugins: [],
}
