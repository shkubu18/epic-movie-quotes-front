<template>
  <modal-background modal="accountIsActivatedModal" />
  <modal-container>
    <div
      class="bg-lighter-black md:bg-dark-blue w-full md:w-fit min-h-screen md:min-h-fit md:mb-12 text-white px-7 md:px-24 py-16 rounded-lg text-center"
    >
      <div
        class="md:w-440 bg-darker-blue md:bg-transparent py-12 px-7 md:p-0 mt-5 md:mt-0 rounded-xl flex items-center flex-col relative"
      >
        <icon-modal-close
          @click="toggleModalVisibility('accountIsActivatedModal')"
          class="md:hidden absolute right-5 top-5 cursor-pointer"
        />
        <icon-success />
        <h1 class="text-3xl font-medium mt-5">{{ $t('texts.thank_you') }}</h1>
        <p class="mt-7 mb-9">{{ $t('auth.your_account_has_been_activated') }}</p>
        <button-base
          @click="toggleModals('accountIsActivatedModal', 'loginModal')"
          class="bg-red w-full py-2.5"
        >
          {{ $t('passwordRecovery.login') }}
        </button-base>
      </div>
    </div>
  </modal-container>
</template>
<script setup>
import ButtonBase from '@/components/ui/buttons/ButtonBase.vue'
import ModalBackground from '@/components/shared/modals/ModalBackground.vue'
import ModalContainer from '@/components/shared/modals/ModalContainer.vue'
import IconSuccess from '@/components/icons/success/IconSuccess.vue'
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