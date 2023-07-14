<template>
  <div
    class="absolute top-0 z-40 w-full bg-transparent-dark-blue flex items-center justify-start flex-col"
    :style="`height: ${minHeight}px`"
  >
    <icon-loading-spinner style="margin-top: calc(100vh / 2.2)" />
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