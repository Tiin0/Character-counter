/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        
        'max-mm' : {max: '753px'},
        'max-sm' : {max: '639px'},
        'min-lg' : {min: '1023px'}
      }
    },
  },
  plugins: [],
}
