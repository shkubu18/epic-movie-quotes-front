<template>
  <div
    v-if="modals[modal]"
    @click="toggleModalVisibility(modal)"
    :class="{
      'absolute z-10 w-full top-24 bg-transparent-dark-blue': true,
      '!top-0 bg-darker-blue': isForMovieQuote
    }"
    :style="isForMovieQuote ? 'min-height: 1650px' : `height: ${minHeight}px`"
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
  },
  isForMovieQuote: {
    required: false,
    type: Boolean
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