/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        unkris: {
          blue: '#1e3a8a',
          gold: '#fbbf24',
        }
      }
    },
  },
  plugins: [],
}