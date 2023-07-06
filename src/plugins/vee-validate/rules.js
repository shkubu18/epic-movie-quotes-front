import { configure, defineRule } from 'vee-validate'
import { between, confirmed, email, image, min, required } from '@vee-validate/rules'

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
    return 'At least 3 & max. 15 lowercase characters.'
  }

  return true
})

defineRule('min-8-max-15-lowercase', (value) => {
  if (value.length < 8 || value.length > 15 || !lowercaseRegex.test(value)) {
    return 'At least 8 & max. 15 lowercase characters.'
  }

  return true
})

defineRule('georgian-text', (value) => {
  if (!georgianTextRegex.test(value)) {
    return 'Please enter georgian letters and only following special characters: .,!"-_?:;\''
  }

  return true
})

defineRule('english-text', (value) => {
  if (!englishTextRegex.test(value)) {
    return 'Please enter english letters and only following special characters: .,!"-_?:;\''
  }

  return true
})
