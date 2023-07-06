<template>
  <div
    v-if="modals[modal]"
    @click="toggleModalVisibility(modal)"
    class="absolute z-10 top-24 w-full bg-transparent-dark-blue"
    :style="`height: ${minHeight}px`"
  ></div>
</template>

<script setup>
import { useModalStore } from '@/stores/useModalStore'
import { computed } from 'vue'
import { storeToRefs } from 'pinia'

defineProps({
  modal: {
    required: true,
    type: String
  }
})

const modalStore = useModalStore()
const { modals } = storeToRefs(modalStore)

const toggleModalVisibility = (modalName) => {
  modalStore.toggleModalVisibility(modalName)
}

const minHeight = computed(() => {
  return document.body.offsetHeight - 96
})
</script>