/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,}'],
  theme: {
    extend: {
      colors: {
        yellow: '#DDCCAA',
        red: '#E31221',
        'dark-blue': '#222030'
      },
      backgroundImage: {
        interstellar: "url('/src/assets/images/landing/interstellar.png')",
        'the-royal-tenenbaums': "url('/src/assets/images/landing/the-royal-tenenbaums.png')",
        'lord-of-rings': "url('/src/assets/images/landing/lord-of-rings.png')"
      },
      boxShadow: {
        inner: 'inset 230px 150px 250px black'
      }
    }
  },
  plugins: []
}
