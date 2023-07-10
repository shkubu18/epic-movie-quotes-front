<template>
  <modal-background modal="passwordForgotModal" />
  <modal-container>
    <div class="bg-dark-blue mb-12 text-white px-24 py-12 rounded-lg text-center">
      <div class="w-440 flex items-center flex-col">
        <h1 class="text-3xl font-medium mt-3">Forgot password?</h1>
        <p class="mt-3 mb-9 text-gray-600">
          Enter the email and we’ll send an email with instructions to reset your password
        </p>
        <form-password-forgot />
        <span
          class="block text-gray-600 mt-10 flex items-center cursor-pointer"
          @click="toggleModals('passwordForgotModal', 'loginModal')"
        >
          <icon-arrow-left class="mr-3" />
          Back to log in
        </span>
      </div>
    </div>
  </modal-container>
</template>
<script setup>
import ModalBackground from '@/components/shared/modals/ModalBackground.vue'
import ModalContainer from '@/components/shared/modals/ModalContainer.vue'
import IconArrowLeft from '@/components/icons/arrows/IconArrowLeft.vue'
import FormPasswordForgot from '@/components/forms/FormPasswordForgot.vue'
import { useModalStore } from '@/stores/useModalStore'

const modalStore = useModalStore()

const toggleModals = (closingModal, openingModal) => {
  modalStore.toggleModalVisibility(closingModal)
  modalStore.toggleModalVisibility(openingModal)
}
</script>