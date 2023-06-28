<template>
  <modal-background modal="alreadyVerifiedEmailModal" />
  <modal-container>
    <div class="bg-dark-blue mb-12 text-white px-24 py-16 rounded-lg text-center">
      <div class="w-440 flex items-center flex-col">
        <icon-warning />
        <h1 class="text-3xl font-medium mt-5">Already Verified!</h1>
        <p class="mt-7 mb-9">Your email is already verified.</p>
        <button-base @click="handleClick" class="bg-red w-full py-2.5">Login</button-base>
      </div>
    </div>
  </modal-container>
</template>
<script setup>
import ButtonBase from '@/components/ui/ButtonBase.vue'
import IconWarning from '@/components/icons/IconWarning.vue'
import ModalBackground from '@/components/shared/modals/ModalBackground.vue'
import ModalContainer from '@/components/shared/modals/ModalContainer.vue'
import { useModalStore } from '@/stores/useModalStore'

const modalStore = useModalStore()

const toggleModalVisibility = (modalName) => {
  modalStore.toggleModalVisibility(modalName)
}

const handleClick = () => {
  toggleModalVisibility('alreadyVerifiedEmailModal')
  toggleModalVisibility('loginModal')
}
</script>