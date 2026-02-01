/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef2f3',
          100: '#fde6e7',
          200: '#fbd0d5',
          300: '#f7aab2',
          400: '#f27a8a',
          500: '#e74c5e',
          600: '#d42a3e',
          700: '#b01f32',
          800: '#961d2e',
          900: '#801c2b',
        },
      },
    },
  },
  plugins: [],
}
