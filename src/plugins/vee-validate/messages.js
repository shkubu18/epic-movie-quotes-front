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
        min: '{field} must have at least 0:{min} symbols'
      },
      names: {
        username_or_email: 'Username or email',
        password: 'Password'
      }
    },
    ka: {
      ...ka,
      messages: {
        required: 'გთხოვთ შეიყვანოთ {field}',
        min: '{field} უნდა შედგებოდეს მინიმუმ 0:{min} სიმბოლოსგან'
      },
      names: {
        username_or_email: 'მომხმარებლის სახელი ან ელ.ფოსტა',
        password: 'პაროლი'
      }
    }
  })
})
