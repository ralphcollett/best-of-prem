/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'pl-purple': '#38003c',
        'pl-green': '#00ff85',
        'pl-white': '#ffffff',
      },
    },
  },
  plugins: [],
}
