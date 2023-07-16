<template>
  <modal-background modal="registerModal" />
  <modal-container>
    <div
      class="bg-dark-blue w-full md:w-fit min-h-screen md:min-h-fit md:mb-12 text-white flex flex-col items-center px-7 md:px-32 py-12 rounded-lg relative"
    >
      <icon-modal-close
        @click="toggleModalVisibility('registerModal')"
        class="md:hidden absolute right-5 top-5 cursor-pointer"
      />
      <h1 class="text-2xl md:text-3xl font-medium mb-2">{{ $t('auth.create_an_account') }}</h1>
      <p class="text-gray-600 mb-7">{{ $t('auth.start_your_journey') }}</p>
      <form-register />
      <button-google-auth />
      <p class="text-gray-600 text-center mt-7">
        {{ $t('auth.already_have_an_account') }}
        <a
          class="text-blue-700 underline cursor-pointer"
          @click="toggleModals('registerModal', 'loginModal')"
        >
          {{ $t('auth.login') }}
        </a>
      </p>
    </div>
  </modal-container>
</template>
<script setup>
import ModalBackground from '@/components/shared/modals/ModalBackground.vue'
import ButtonGoogleAuth from '@/components/shared/ButtonGoogleAuth.vue'
import ModalContainer from '@/components/layouts/modals/ModalContainer.vue'
import FormRegister from '@/components/forms/FormRegister.vue'
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