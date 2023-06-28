<template>
  <modal-background modal="loginModal" />
  <modal-container>
    <div class="bg-dark-blue mb-12 text-white flex flex-col items-center px-32 py-12 rounded-lg">
      <h1 class="text-3xl font-medium mb-2">Log in to your account</h1>
      <p class="text-gray-600 mb-7">Welcome back! Please enter your details.</p>
      <form-login />
      <button-google-auth />
      <p class="text-gray-600 text-center mt-7">
        Already have an account?
        <a
          class="text-blue-700 underline cursor-pointer"
          @click="toggleModals('loginModal', 'registerModal')"
        >
          Sign up
        </a>
      </p>
    </div>
  </modal-container>
</template>
<script setup>
import ModalBackground from '@/components/shared/modals/ModalBackground.vue'
import FormLogin from '@/components/forms/FormLogin.vue'
import ButtonGoogleAuth from '@/components/shared/ButtonGoogleAuth.vue'
import ModalContainer from '@/components/shared/modals/ModalContainer.vue'
import { useModalStore } from '@/stores/useModalStore'

const modalStore = useModalStore()

const toggleModals = (closingModal, openingModal) => {
  modalStore.toggleModalVisibility(closingModal)
  modalStore.toggleModalVisibility(openingModal)
}
</script>