<template>
  <ValidationForm v-slot="{ errors }" class="w-full text-left" @submit="handleSubmit">
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
    <button-base class="bg-red w-full py-2">
      {{ $t('passwordRecovery.reset_password') }}
    </button-base>
  </ValidationForm>
</template>
<script setup>
import { Form as ValidationForm } from 'vee-validate'
import InputAuth from '@/components/ui/InputAuth.vue'
import { ref } from 'vue'
import { passwordUpdate, setCookies } from '@/services/api/auth'
import { useModalStore } from '@/stores/useModalStore'
import { useSpinnerStore } from '@/stores/useSpinnerStore'
import ButtonBase from '@/components/ui/ButtonBase.vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const modalStore = useModalStore()
const spinnerStore = useSpinnerStore()

const toggleModalVisibility = (modalName) => {
  modalStore.toggleModalVisibility(modalName)
}

const password = ref('')
const passwordConfirmation = ref('')

async function handleSubmit() {
  spinnerStore.toggleActiveStatus()
  await setCookies()
  await passwordUpdate(password.value, passwordConfirmation.value, route.query.token)
    .then((response) => {
      if (response.status === 201) {
        router.replace('/')
        toggleModalVisibility('passwordUpdateModal')
        toggleModalVisibility('passwordUpdatedSuccessfullyModal')
      }
    })
    .catch((error) => {
      if (error.response.status === 403) {
        router.replace('/')
        toggleModalVisibility('passwordUpdateModal')
        toggleModalVisibility('passwordResetTokenExpiredModal')
      }
    })
  spinnerStore.toggleActiveStatus()
}
</script>