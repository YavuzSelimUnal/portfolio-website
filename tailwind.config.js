/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#EDEEE6',
        paperDim: '#E2E4D9',
        ink: '#1C2733',
        inkFaint: '#4A5560',
        blue: '#2F5D8A',
        blueDeep: '#1F3F5E',
        amber: '#D98E2B',
        hairline: '#B8BFC4',
      },
      fontFamily: {
        mono: ['"IBM Plex Mono"', 'monospace'],
        sans: ['"IBM Plex Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
