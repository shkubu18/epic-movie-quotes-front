<template>
  <ValidationForm v-slot="{ errors }" class="w-96" @submit="handleSubmit">
    <input-auth
      label="Username or email"
      name="username_or_email"
      placeholder="Enter your username or email"
      type="text"
      v-model="userNameOrEmail"
      rules="required|min:3"
      :error="errors.username_or_email"
    />
    <input-auth
      label="Password"
      name="password"
      placeholder="Password"
      type="password"
      v-model="password"
      rules="required"
      :error="errors.password"
    />
    <span class="text-red block mb-5">{{ errorMessage }}</span>
    <div class="flex justify-between">
      <div class="flex items-center">
        <input
          class="w-5 h-5 rounded border-none mr-2 text-blue-700 focus:ring-blue-700"
          type="checkbox"
          name="remember"
          id="remember"
          v-model="remember"
        />
        <label for="remember">Remember me</label>
      </div>
      <a class="text-blue-700 text-right ml-2 text-blue underline" href="#"> Forgot password </a>
    </div>
    <button-base class="bg-red w-full mt-4 py-2">Sign in</button-base>
  </ValidationForm>
</template>
<script setup>
import ButtonBase from '@/components/ui/ButtonBase.vue'
import { Form as ValidationForm } from 'vee-validate'
import InputAuth from '@/components/ui/InputAuth.vue'
import { ref } from 'vue'
import { login, setCookies } from '@/services/api/auth'
import { useRouter } from 'vue-router'

const router = useRouter()

const userNameOrEmail = ref('')
const password = ref('')
const remember = ref(false)
const errorMessage = ref('')

async function handleSubmit() {
  await setCookies()

  login(userNameOrEmail.value, password.value, remember.value)
    .then((response) => {
      if (response.status === 200) {
        router.replace({ path: '/newsfeed' })
      }
    })
    .catch((error) => {
      errorMessage.value = ''
      errorMessage.value = error.response.data.message
    })
}
</script>