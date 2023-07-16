<template>
  <div
    v-if="modals[props.modal]"
    @click="toggleModalVisibility(props.modal)"
    class="absolute z-10 w-full h-screen backdrop-blur-xs flex items-center justify-center cursor-pointer"
    :style="`height: ${minHeight}px`"
  ></div>
</template>

<script setup>
import { useModalStore } from '@/stores/useModalStore'
import { computed } from 'vue'

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

const minHeight = computed(() => {
  return document.body.offsetHeight
})
</script>