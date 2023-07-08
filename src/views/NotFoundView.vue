<template>
  <main class="min-h-screen bg-darker-blue flex items-center justify-center flex-col text-white">
    <div class="flex items-center justify-center flex-col mb-20">
      <icon-not-found />
      <icon-not-found-circle class="mt-6 mb-10" />
      <h1 class="text-5xl font-bold">Whoops!</h1>
      <p class="text-2xl mt-5 mb-14">We can't see the page you are looking for</p>
      <button-return-home />
    </div>
  </main>
</template>
<script setup>
import IconNotFound from '@/components/icons/notfound/IconNotFound.vue'
import IconNotFoundCircle from '@/components/icons/notfound/IconNotFoundCircle.vue'
import ButtonReturnHome from '@/components/ui/ButtonReturnHome.vue'
</script>