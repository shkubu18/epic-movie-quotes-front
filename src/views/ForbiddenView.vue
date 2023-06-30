<template>
  <main
    class="min-h-screen bg-darker-blue flex items-center justify-center flex-col text-white relative"
  >
    <icon-forbidden class="absolute top-48 z-10" />
    <icon-forbidden-circles class="absolute top-60" />
    <h1 class="text-5xl font-bold">You shall not pass!</h1>
    <p class="text-2xl mt-5 mb-14">Sorry, but you don’t have permission to access this page</p>
    <button-return-home />
  </main>
</template>
<script setup>
import IconForbidden from '@/components/icons/IconForbidden.vue'
import IconForbiddenCircles from '@/components/icons/IconForbiddenCircles.vue'
import ButtonReturnHome from '@/components/ui/ButtonReturnHome.vue'
</script>