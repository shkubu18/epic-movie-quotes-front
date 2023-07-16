<template>
  <modal-background modal="passwordResetTokenExpiredModal" />
  <modal-container>
    <div
      class="bg-lighter-black md:bg-dark-blue w-full md:w-fit min-h-screen md:min-h-fit md:mb-12 text-white px-7 md:px-24 py-16 rounded-lg text-center"
    >
      <div
        class="md:w-440 bg-darker-blue md:bg-transparent py-12 px-7 md:p-0 mt-5 md:mt-0 rounded-xl flex items-center flex-col relative"
      >
        <icon-modal-close
          @click="toggleModalVisibility('passwordResetTokenExpiredModal')"
          class="md:hidden absolute right-5 top-5 cursor-pointer"
        />
        <icon-warning />
        <h1 class="text-3xl font-medium mt-5">
          {{ $t('passwordRecovery.password_token_expired_short_text') }}
        </h1>
        <p class="mt-7 mb-9">{{ $t('passwordRecovery.password_token_expired_long_text') }}</p>
        <button-base
          @click="toggleModals('passwordResetTokenExpiredModal', 'passwordForgotModal')"
          class="bg-red w-full py-2.5"
        >
          {{ $t('passwordRecovery.reset_password_again') }}
        </button-base>
      </div>
    </div>
  </modal-container>
</template>
<script setup>
import ModalBackground from '@/components/shared/modals/ModalBackground.vue'
import ModalContainer from '@/components/shared/modals/ModalContainer.vue'
import IconWarning from '@/components/icons/IconWarning.vue'
import ButtonBase from '@/components/ui/buttons/ButtonBase.vue'
import { useModalStore } from '@/stores/useModalStore'
import IconModalClose from '@/components/icons/IconModalClose.vue'

const modalStore = useModalStore()

function toggleModals(closingModal, openingModal) {
  modalStore.toggleModalVisibility(closingModal)
  modalStore.toggleModalVisibility(openingModal)
}

const toggleModalVisibility = (modalName) => {
  modalStore.toggleModalVisibility(modalName)
}
</script>