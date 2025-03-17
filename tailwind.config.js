/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      gridRowStart: {
        '8': '8'
      },
      transitionProperty: {
        'height': 'height'
      }
    },
  },
  plugins: [],
}

