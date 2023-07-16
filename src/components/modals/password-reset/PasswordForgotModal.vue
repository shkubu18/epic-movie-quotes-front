<template>
  <modal-background modal="passwordForgotModal" />
  <modal-container>
    <div
      class="bg-dark-blue w-full md:w-fit min-h-screen md:min-h-fit md:mb-12 text-white px-7 md:px-24 py-24 md:py-12 rounded-lg text-center relative"
    >
      <icon-modal-close
        @click="toggleModalVisibility('passwordForgotModal')"
        class="md:hidden absolute right-5 top-5 cursor-pointer"
      />
      <div class="md:w-440 flex items-center flex-col">
        <h1 class="text-3xl font-medium mt-3">{{ $t('passwordRecovery.forgot_password') }}</h1>
        <p class="mt-3 mb-9 text-gray-600">
          {{ $t('passwordRecovery.enter_the_email_and_we_will_send_email_with_instructions') }}
        </p>
        <form-password-forgot />
        <span
          class="text-gray-600 mt-10 flex items-center cursor-pointer"
          @click="toggleModals('passwordForgotModal', 'loginModal')"
        >
          <icon-arrow-left class="mr-3" />
          {{ $t('passwordRecovery.back_to_login') }}
        </span>
      </div>
    </div>
  </modal-container>
</template>
<script setup>
import ModalBackground from '@/components/shared/modals/ModalBackground.vue'
import ModalContainer from '@/components/layouts/modals/ModalContainer.vue'
import IconArrowLeft from '@/components/icons/arrows/IconArrowLeft.vue'
import FormPasswordForgot from '@/components/forms/password/FormPasswordForgot.vue'
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