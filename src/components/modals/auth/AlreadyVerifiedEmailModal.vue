<template>
  <modal-background modal="alreadyVerifiedEmailModal" />
  <modal-container>
    <div
      class="bg-lighter-black md:bg-dark-blue w-full md:w-fit min-h-screen md:min-h-fit md:mb-12 text-white px-7 md:px-24 py-16 rounded-lg text-center"
    >
      <div
        class="md:w-440 bg-darker-blue md:bg-transparent py-12 px-7 md:p-0 mt-5 md:mt-0 rounded-xl flex items-center flex-col relative"
      >
        <icon-modal-close
          @click="toggleModalVisibility('alreadyVerifiedEmailModal')"
          class="md:hidden absolute right-5 top-5 cursor-pointer"
        />
        <icon-warning />
        <h1 class="text-3xl font-medium mt-5">{{ $t('auth.already_verified') }}</h1>
        <p class="mt-7 mb-9">{{ $t('auth.your_email_is_already_verified') }}</p>
        <button-base
          @click="toggleModals('alreadyVerifiedEmailModal', 'loginModal')"
          class="bg-red w-full py-2.5"
        >
          {{ $t('auth.login') }}
        </button-base>
      </div>
    </div>
  </modal-container>
</template>
<script setup>
import ButtonBase from '@/components/ui/buttons/ButtonBase.vue'
import IconWarning from '@/components/icons/IconWarning.vue'
import ModalBackground from '@/components/shared/modals/ModalBackground.vue'
import ModalContainer from '@/components/layouts/modals/ModalContainer.vue'
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