/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,}'],
  theme: {
    extend: {
      colors: {
        yellow: '#DDCCAA',
        red: '#E31221',
        'dark-blue': '#222030',
        green: '#198754',
        'darker-blue': '#150D1F',
        black: '#0e0d15',
        'newsfeed-quote-border-color': '#EFEFEF4D'
      },
      backgroundImage: {
        interstellar: "url('/src/assets/images/landing/interstellar.png')",
        'the-royal-tenenbaums': "url('/src/assets/images/landing/the-royal-tenenbaums.png')",
        'lord-of-rings': "url('/src/assets/images/landing/lord-of-rings.png')"
      },
      boxShadow: {
        inner: 'inset 230px 150px 250px black'
      },
      blur: {
        xs: '1.5px'
      },
      fontSize: {
        '3xl': '2rem'
      },
      borderWidth: {
        3: '3px'
      },
      width: {
        440: '440px',
        940: '940px',
        890: '890px',
        680: '680px'
      },
      height: {
        500: '500px',
        370: '370px'
      }
    }
  },
  plugins: [
    // eslint-disable-next-line no-undef
    // require('@tailwindcss/forms')
  ]
}
