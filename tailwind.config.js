/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'cm-bg':     '#000c1a',
        'cm-panel':  '#000818',
        'cm-border': '#003366',
        'cm-yellow': '#ffff00',
        'cm-cyan':   '#00ccff',
        'cm-red':    '#cc0000',
        'cm-green':  '#006400',
        'cm-pitch':  '#007a00',
      },
      fontFamily: {
        mono: ['"Courier New"', 'Courier', 'monospace'],
      },
    },
  },
  plugins: [],
}
