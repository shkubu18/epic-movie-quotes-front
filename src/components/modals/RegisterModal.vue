<template>
  <modal-background modal="registerModal" />
  <modal-container>
    <div class="bg-dark-blue mb-12 text-white flex flex-col items-center px-32 py-12 rounded-lg">
      <h1 class="text-3xl font-medium mb-2">Create an account</h1>
      <p class="text-gray-600 mb-7">Start your journey!</p>
      <form-register />
      <button-google-auth />
      <p class="text-gray-600 text-center mt-7">
        Already have an account?
        <a class="text-blue-700 underline cursor-pointer" @click="handleClick">Log in</a>
      </p>
    </div>
  </modal-container>
</template>
<script setup>
import ModalBackground from '@/components/shared/modals/ModalBackground.vue'
import ButtonGoogleAuth from '@/components/shared/ButtonGoogleAuth.vue'
import ModalContainer from '@/components/shared/modals/ModalContainer.vue'
import FormRegister from '@/components/forms/FormRegister.vue'
import { useModalStore } from '@/stores/useModalStore'

const modalStore = useModalStore()

const handleClick = () => {
  modalStore.toggleModalVisibility('registerModal')
  modalStore.toggleModalVisibility('loginModal')
}
</script>