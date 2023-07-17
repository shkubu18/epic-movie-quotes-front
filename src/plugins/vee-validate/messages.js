import { configure } from 'vee-validate'
import { localize } from '@vee-validate/i18n'
import en from '@vee-validate/i18n/dist/locale/en.json'
import ka from '@vee-validate/i18n/dist/locale/ka.json'

configure({
  generateMessage: localize({
    en: {
      ...en,
      messages: {
        required: '{field} field is required',
        min: '{field} must have at least 0:{min} symbols',
        max: '{field} must have maximum 0:{max} symbols',
        email: 'Please enter a valid email address',
        confirmed: "{field} doesn't match the password",
        between: 'Please enter the {field} correctly between 1888 to 2023',
        image: 'Please upload the file in image format only'
      },
      fields: {
        movie_id: {
          required: 'Please choose a movie'
        }
      },
      names: {
        username_or_email: 'Username or email',
        password: 'Password',
        email: 'Email',
        password_confirmation: 'Confirm password',
        movie_name_en: 'Movie name in English',
        movie_name_ka: 'Movie name in Georgian',
        release_date: 'Year',
        director_en: 'Director name in English',
        director_ka: 'Director name in Georgian',
        description_en: 'Movie description in English',
        description_ka: 'Movie description in Georgian',
        picture: 'Image',
        genres: 'Genres',
        quote_name_en: 'Quote in English',
        quote_name_ka: 'Quote in Georgian',
        movie_id: 'Movie'
      }
    },
    ka: {
      ...ka,
      messages: {
        required: 'გთხოვთ შეიყვანოთ {field}',
        min: '{field} უნდა შედგებოდეს მინიმუმ 0:{min} სიმბოლოსგან',
        max: '{field} უნდა შედგებოდეს მაქსიმუმ 0:{max} სიმბოლოსგან',
        email: 'გთხოვთ შეიყვანოთ ვალიდური ელ.ფოსტის მისამართი',
        confirmed: '{field} არ ემთხვევა პაროლს',
        between: 'გთხოვთ სწორად ჩაწეროთ {field} 1888 წლიდან 2023 წლამდე',
        image: 'გთხოვთ, ატვირთოთ ფაილი მხოლოდ სურათის ფორმატში'
      },
      fields: {
        picture: {
          required: 'გთხოვთ აირჩიოთ სურათი'
        },
        movie_id: {
          required: 'გთხოვთ აირჩიეთ ფილმი'
        }
      },
      names: {
        username_or_email: 'მომხმარებლის სახელი ან ელ.ფოსტა',
        password: 'პაროლი',
        email: 'ელ.ფოსტა',
        password_confirmation: 'განმეორებითი პაროლი',
        movie_name_en: 'ფილმის სახელი ინგლისურად',
        movie_name_ka: 'ფილმის სახელი ქართულად',
        release_date: 'წელი',
        director_en: 'რეჟისორის სახელი ინგლისურად',
        director_ka: 'რეჟისორის სახელი ქართულად',
        description_en: 'ფილმის აღწერა ინგლისურად',
        description_ka: 'ფილმის აღწერა ქართულად',
        picture: 'სურათი',
        genres: 'ჟანრი',
        quote_name_en: 'ციტატა ინგლისურად',
        quote_name_ka: 'ციტატა ქართულად',
        movie_id: 'ფილმი'
      }
    }
  })
})
