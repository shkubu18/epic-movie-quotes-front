<template>
  <ValidationForm v-slot="{ errors }" class="w-96" @submit="handleSubmit">
    <input-auth
      label="Name"
      name="username"
      placeholder="At least 3 & max.15 lower case characters"
      type="text"
      v-model="username"
      rules="min-3-max-15-lowercase"
      :error="errors.username"
    />
    <input-auth
      label="Email"
      name="email"
      placeholder="Enter your email"
      type="text"
      v-model="email"
      rules="required|email"
      :error="errors.email"
    />
    <input-auth
      label="Password"
      name="password"
      placeholder="At least 8 & max.15 lower case characters"
      type="password"
      v-model="password"
      rules="min-8-max-15-lowercase"
      :error="errors.password"
    />
    <input-auth
      label="Confirm password"
      name="password_confirmation"
      placeholder="Confirm password"
      type="password"
      v-model="passwordConfirmation"
      rules="required|confirmed:@password"
      :error="errors.password_confirmation"
    />
    <ul v-for="(errors, field) in errorMessages" :key="field">
      <li class="text-red block mb-2" v-for="error in errors" :key="error">{{ error }}</li>
    </ul>
    <the-button class="bg-red w-full mt-4 py-2">Sign Up</the-button>
  </ValidationForm>
</template>
<script setup>
import TheButton from '@/components/ui/ButtonBase.vue'
import { Form as ValidationForm } from 'vee-validate'
import InputAuth from '@/components/ui/InputAuth.vue'
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