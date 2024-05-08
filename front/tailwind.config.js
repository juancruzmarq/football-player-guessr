/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'text': '#121714',
        'background': '#f7f9f8',
        'primary': '#708f81',
        'secondary': '#c4b4ba',
        'accent': '#aea797',
      },
    },
  },
  plugins: [],
}

