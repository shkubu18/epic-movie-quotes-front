<template>
  <div
    class="absolute top-0 z-20 w-full h-screen bg-[#222030e6] flex items-center justify-center flex-col"
  >
    <icon-loading-spinner />
    <h1 class="text-xl text-white font-bold mt-2">Please wait...</h1>
  </div>
</template>
<script setup>
import IconLoadingSpinner from '@/components/icons/IconLoadingSpinner.vue'
</script>