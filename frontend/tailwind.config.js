/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx,scss}"],
  theme: {
    extend: {
      fontFamily: {
        'robotoLight': ['Roboto Mono', 'monospace']
      }
    },
  },
  plugins: [],
}