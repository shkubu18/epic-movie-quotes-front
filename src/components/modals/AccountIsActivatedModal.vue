<template>
  <modal-background modal="accountIsActivatedModal" />
  <modal-container>
    <div class="bg-dark-blue mb-12 text-white px-24 py-20 rounded-lg text-center">
      <div class="w-440 flex items-center flex-col">
        <icon-success />
        <h1 class="text-3xl font-medium mt-5">Thank You!</h1>
        <p class="mt-7 mb-9">Your account has been activated.</p>
        <button-base
          @click="toggleModals('accountIsActivatedModal', 'loginModal')"
          class="bg-red w-full py-2.5"
        >
          Login
        </button-base>
      </div>
    </div>
  </modal-container>
</template>
<script setup>
import ButtonBase from '@/components/ui/ButtonBase.vue'
import ModalBackground from '@/components/shared/modals/ModalBackground.vue'
import ModalContainer from '@/components/shared/modals/ModalContainer.vue'
import IconSuccess from '@/components/icons/IconSuccess.vue'
import { useModalStore } from '@/stores/useModalStore'

const modalStore = useModalStore()

const toggleModals = (closingModal, openingModal) => {
  modalStore.toggleModalVisibility(closingModal)
  modalStore.toggleModalVisibility(openingModal)
}
</script>