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
        confirmed: "{field} doesn't match the password"
      },
      names: {
        username_or_email: 'Username or email',
        password: 'Password',
        email: 'Email',
        password_confirmation: 'Confirm password'
      }
    },
    ka: {
      ...ka,
      messages: {
        required: 'გთხოვთ შეიყვანოთ {field}',
        min: '{field} უნდა შედგებოდეს მინიმუმ 0:{min} სიმბოლოსგან',
        max: '{field} უნდა შედგებოდეს მაქსიმუმ 0:{max} სიმბოლოსგან',
        email: 'გთხოვთ შეიყვანოთ ვალიდური ელ.ფოსტის მისამართი',
        confirmed: '{field} არ ემთხვევა პაროლს'
      },
      names: {
        username_or_email: 'მომხმარებლის სახელი ან ელ.ფოსტა',
        password: 'პაროლი',
        email: 'ელ.ფოსტა',
        password_confirmation: 'განმეორებითი პაროლი'
      }
    }
  })
})
