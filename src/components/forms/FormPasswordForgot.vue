<template>
  <ValidationForm v-slot="{ errors }" class="w-full md:w-96 text-left" @submit="handleSubmit">
    <input-auth
      :label="$t('auth.labels.email')"
      name="email"
      :placeholder="$t('auth.placeholders.enter_your_email')"
      type="text"
      v-model="email"
      rules="required|email"
      :error="errors.email"
    />
    <span v-if="errorMessage" class="text-red mb-5 block">{{ errorMessage }}</span>
    <button-base class="bg-red w-full py-2"
      >{{ $t('passwordRecovery.send_instructions') }}
    </button-base>
  </ValidationForm>
</template>
<script setup>
import { Form as ValidationForm } from 'vee-validate'
import InputAuth from '@/components/ui/InputAuth.vue'
import { ref } from 'vue'
import { sendPasswordForgotEmail, setCookies } from '@/services/api/auth'
import { useModalStore } from '@/stores/useModalStore'
import { useSpinnerStore } from '@/stores/useSpinnerStore'
import ButtonBase from '@/components/ui/ButtonBase.vue'

const modalStore = useModalStore()
const spinnerStore = useSpinnerStore()

const toggleModalVisibility = (modalName) => {
  modalStore.toggleModalVisibility(modalName)
}

const email = ref('')
const errorMessage = ref('')

async function handleSubmit() {
  spinnerStore.toggleActiveStatus()
  await setCookies()
  await sendPasswordForgotEmail(email.value)
    .then((response) => {
      if (response.status === 200) {
        toggleModalVisibility('passwordForgotModal')
        toggleModalVisibility('passwordResetEmailSentModal')
      }
    })
    .catch((error) => {
      errorMessage.value = ''
      errorMessage.value = error.response.data.message
    })
  spinnerStore.toggleActiveStatus()
}
</script>