<template>
  <ValidationForm v-slot="{ errors }" class="w-full md:w-96" @submit="handleSubmit">
    <input-auth
      :label="$t('auth.labels.username_or_email')"
      name="username_or_email"
      :placeholder="$t('auth.placeholders.enter_your_username_or_email')"
      type="text"
      v-model="userNameOrEmail"
      rules="required|min:3"
      :error="errors.username_or_email"
    />
    <input-auth
      :label="$t('auth.password')"
      name="password"
      :placeholder="$t('auth.password')"
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
        <label for="remember">{{ $t('auth.labels.remember_me') }}</label>
      </div>
      <a
        class="text-blue-700 text-right ml-2 text-blue underline cursor-pointer"
        @click="toggleModals('loginModal', 'passwordForgotModal')"
      >
        {{ $t('auth.forgot_password') }}
      </a>
    </div>
    <button-base class="bg-red w-full mt-4 py-2">{{ $t('auth.sign_in') }}</button-base>
  </ValidationForm>
</template>
<script setup>
import ButtonBase from '@/components/ui/buttons/ButtonBase.vue'
import { Form as ValidationForm } from 'vee-validate'
import InputAuth from '@/components/ui/inputs/InputAuth.vue'
import { ref } from 'vue'
import { login, setCookies } from '@/services/api/auth'
import { useRouter } from 'vue-router'
import { useModalStore } from '@/stores/useModalStore'

const modalStore = useModalStore()

const toggleModals = (closingModal, openingModal) => {
  modalStore.toggleModalVisibility(closingModal)
  modalStore.toggleModalVisibility(openingModal)
}

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
        modalStore.toggleModalVisibility('loginModal')
      }
    })
    .catch((error) => {
      errorMessage.value = ''
      errorMessage.value = error.response.data.message
    })
}
</script>