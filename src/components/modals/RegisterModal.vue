<template>
  <modal-background modal="registerModal" />
  <modal-container>
    <div class="bg-dark-blue mb-12 text-white flex flex-col items-center px-32 py-12 rounded-lg">
      <h1 class="text-3xl font-medium mb-2">{{ $t('auth.create_an_account') }}</h1>
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
import ModalContainer from '@/components/shared/modals/ModalContainer.vue'
import FormRegister from '@/components/forms/FormRegister.vue'
import { useModalStore } from '@/stores/useModalStore'

const modalStore = useModalStore()

const toggleModals = (closingModal, openingModal) => {
  modalStore.toggleModalVisibility(closingModal)
  modalStore.toggleModalVisibility(openingModal)
}
</script>