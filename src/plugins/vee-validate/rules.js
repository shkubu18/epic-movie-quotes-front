import { configure, defineRule } from 'vee-validate'
import { between, confirmed, email, image, min, required } from '@vee-validate/rules'
import i18n from '@/plugins/i18n'

configure({ validateOnInput: true })

defineRule('required', required)
defineRule('min', min)
defineRule('email', email)
defineRule('confirmed', confirmed)
defineRule('between', between)
defineRule('image', image)

const lowercaseRegex = /^[a-z0-9]+$/
const georgianTextRegex = /^[ა-ჰ0-9_'";?!:.,\s-]+$/
const englishTextRegex = /^[a-zA-Z0-9_'";?!:.,\s-]+$/

defineRule('min-3-max-15-lowercase', (value) => {
  if (value.length < 3 || value.length > 15 || !lowercaseRegex.test(value)) {
    return i18n.global.t('validation.min_max_numbers_and_lower_case_characters', { minNumber: 3 })
  }

  return true
})

defineRule('min-8-max-15-lowercase', (value) => {
  if (value.length < 8 || value.length > 15 || !lowercaseRegex.test(value)) {
    return i18n.global.t('validation.min_max_numbers_and_lower_case_characters', { minNumber: 8 })
  }

  return true
})

defineRule('georgian-text', (value) => {
  if (!georgianTextRegex.test(value)) {
    return i18n.global.t('validation.lang_letters_and_only_following_special_characters', {
      lang: i18n.global.t('validation.georgian')
    })
  }

  return true
})

defineRule('english-text', (value) => {
  if (!englishTextRegex.test(value)) {
    return i18n.global.t('validation.lang_letters_and_only_following_special_characters', {
      lang: i18n.global.t('validation.english')
    })
  }

  return true
})
