<template>
  <div
    class="absolute top-0 z-20 w-full bg-transparent-dark-blue flex items-center justify-center flex-col"
    :style="`height: ${minHeight}px`"
  >
    <icon-loading-spinner />
    <h1 class="text-xl text-white font-bold mt-2">Please wait...</h1>
  </div>
</template>
<script setup>
import IconLoadingSpinner from '@/components/icons/IconLoadingSpinner.vue'
import { computed } from 'vue'

const minHeight = computed(() => {
  return document.body.offsetHeight
})
</script>