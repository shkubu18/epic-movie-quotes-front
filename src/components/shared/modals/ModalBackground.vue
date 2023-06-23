<template>
  <div
    v-if="modals[props.modal]"
    @click="toggleModalVisibility(props.modal)"
    class="absolute z-10 w-full h-screen backdrop-blur-xs flex items-center justify-center"
  ></div>
</template>

<script setup>
import { useModalStore } from '@/stores/useModalStore'

const props = defineProps({
  modal: {
    required: true,
    type: String
  }
})

const modalStore = useModalStore()
const modals = modalStore.modals

const toggleModalVisibility = (modalName) => {
  modalStore.toggleModalVisibility(modalName)
}
</script>