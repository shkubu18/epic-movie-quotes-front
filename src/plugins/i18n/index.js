import { createI18n } from 'vue-i18n'
import en from '@/plugins/i18n/lang/en'
import ka from '@/plugins/i18n/lang/ka'

const messages = {
  en,
  ka
}

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages
})

export default i18n
