<template>
  <div
    v-show="!modals.mobileProfileAskConfirmationModal"
    class="lg:hidden absolute top-36 z-20 w-full min-h-screen bg-darker-blue text-white"
    :style="`height: ${minHeight}px`"
  >
    <slot />
  </div>
</template>

<script setup>
import { useModalStore } from '@/stores/useModalStore'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const modalStore = useModalStore()
const { modals } = storeToRefs(modalStore)

const minHeight = computed(() => {
  return document.body.offsetHeight - 114
})
</script>