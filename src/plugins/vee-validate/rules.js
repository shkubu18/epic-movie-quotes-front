import { configure, defineRule } from 'vee-validate'
import { confirmed, email, min, required } from '@vee-validate/rules'

configure({ validateOnInput: true })

defineRule('required', required)
defineRule('min', min)
defineRule('email', email)
defineRule('confirmed', confirmed)

const lowercaseRegex = /^[a-z0-9]+$/

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
