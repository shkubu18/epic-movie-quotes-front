<template>
  <modal-background modal="loginModal" />
  <modal-default-layout>
    <div
      class="bg-dark-blue w-full md:w-fit min-h-screen md:min-h-fit md:mb-12 text-white flex flex-col items-center px-7 md:px-32 py-20 md:py-12 rounded-lg relative"
    >
      <icon-modal-close
        @click="toggleModalVisibility('loginModal')"
        class="md:hidden absolute right-5 top-5 cursor-pointer"
      />
      <h1 class="text-2xl md:text-3xl font-medium mb-2 whitespace-nowrap">
        {{ $t('auth.login_to_your_account') }}
      </h1>
      <p class="text-gray-600 mb-7 text-center">{{ $t('auth.enter_your_details') }}</p>
      <form-login />
      <button-google-auth />
      <p class="text-gray-600 text-center mt-7">
        {{ $t('auth.dont_have_an_account') }}
        <a
          class="text-blue-700 underline cursor-pointer"
          @click="toggleModals('loginModal', 'registerModal')"
        >
          {{ $t('auth.sign_up') }}
        </a>
      </p>
    </div>
  </modal-default-layout>
</template>
<script setup>
import ModalBackground from '@/components/shared/modals/ModalBackground.vue'
import FormLogin from '@/components/forms/FormLogin.vue'
import ButtonGoogleAuth from '@/components/shared/ButtonGoogleAuth.vue'
import ModalDefaultLayout from '@/components/layouts/ModalDefaultLayout.vue'
import { useModalStore } from '@/stores/useModalStore'
import IconModalClose from '@/components/icons/IconModalClose.vue'

const modalStore = useModalStore()

const toggleModals = (closingModal, openingModal) => {
  modalStore.toggleModalVisibility(closingModal)
  modalStore.toggleModalVisibility(openingModal)
}

const toggleModalVisibility = (modalName) => {
  modalStore.toggleModalVisibility(modalName)
}
</script>