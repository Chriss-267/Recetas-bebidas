/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    //aqui se pueden poner clases personalizadas
    extend: {
      backgroundImage : {
        "header" : "url('/bg.jpg')"
      }
    },
  },
  plugins: [],
}

