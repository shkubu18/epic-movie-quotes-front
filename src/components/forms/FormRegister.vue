<template>
  <ValidationForm v-slot="{ errors }" class="w-full md:w-96" @submit="handleSubmit">
    <input-auth
      :label="$t('auth.labels.name')"
      name="username"
      :placeholder="$t('validation.min_max_numbers_and_lower_case_characters', { minNumber: 3 })"
      type="text"
      v-model="username"
      rules="min-3-max-15-lowercase"
      :error="errors.username"
    />
    <input-auth
      :label="$t('auth.labels.email')"
      name="email"
      :placeholder="$t('auth.placeholders.enter_your_email')"
      type="text"
      v-model="email"
      rules="required|email"
      :error="errors.email"
    />
    <input-auth
      :label="$t('auth.password')"
      name="password"
      :placeholder="$t('validation.min_max_numbers_and_lower_case_characters', { minNumber: 8 })"
      type="password"
      v-model="password"
      rules="min-8-max-15-lowercase"
      :error="errors.password"
    />
    <input-auth
      :label="$t('auth.labels.confirm_password')"
      name="password_confirmation"
      :placeholder="$t('auth.placeholders.confirm_password')"
      type="password"
      v-model="passwordConfirmation"
      rules="required|confirmed:@password"
      :error="errors.password_confirmation"
    />
    <ul v-for="(errors, field) in errorMessages" :key="field">
      <li class="text-red block mb-2" v-for="error in errors" :key="error">{{ error }}</li>
    </ul>
    <the-button class="bg-red w-full mt-4 py-2">{{ $t('auth.sign_up') }}</the-button>
  </ValidationForm>
</template>
<script setup>
import TheButton from '@/components/ui/buttons/ButtonBase.vue'
import { Form as ValidationForm } from 'vee-validate'
import InputAuth from '@/components/ui/inputs/InputAuth.vue'
import { ref } from 'vue'
import { register, setCookies } from '@/services/api/auth'
import { useModalStore } from '@/stores/useModalStore'
import { useSpinnerStore } from '@/stores/useSpinnerStore'

const modalStore = useModalStore()
const spinnerStore = useSpinnerStore()

const toggleModalVisibility = (modalName) => {
  modalStore.toggleModalVisibility(modalName)
}

const username = ref('')
const password = ref('')
const email = ref('')
const passwordConfirmation = ref('')
const errorMessages = ref({})

async function handleSubmit() {
  spinnerStore.toggleActiveStatus()
  await setCookies()
  await register(username.value, email.value, password.value, passwordConfirmation.value)
    .then((response) => {
      if (response.status === 201) {
        toggleModalVisibility('registerModal')
        toggleModalVisibility('emailSentModal')
      }
    })
    .catch((error) => {
      errorMessages.value = {}
      errorMessages.value = error.response.data.errors
    })
  spinnerStore.toggleActiveStatus()
}
</script>