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
        'darker-blue': '#181623',
        'default-border-b-color': '#EFEFEF4D',
        'transparent-dark-blue': '#22203099',
        'lighter-black': '#11101A',
        'crud-input-gray': '#6C757D',
        'transparent-black': '#000000a6',
        'liked-color': '#F3426C',
        'custom-gray': '#6C757D80',
        'notification-circle-color': '#E33812',
        'light-green': '#BADBCC',
        'dark-green': '#0F5132'
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
        370: '370px',
        86: '86px',
        440: '440px',
        810: '810px'
      },
      minHeight: {
        1500: '1500px',
        1650: '1650px'
      }
    }
  },
  plugins: []
}
