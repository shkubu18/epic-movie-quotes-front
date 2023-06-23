import { configure, defineRule } from 'vee-validate'
import { min, required } from '@vee-validate/rules'

configure({ validateOnInput: true })

defineRule('required', required)
defineRule('min', min)
