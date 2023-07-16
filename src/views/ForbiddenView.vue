<template>
  <main
    class="min-h-screen bg-darker-blue flex items-center justify-center flex-col text-white relative"
  >
    <icon-forbidden class="absolute top-10 lg:top-48 z-10" />
    <icon-forbidden-circles class="absolute top-24 lg:top-60" />
    <h1 class="text-2xl lg:text-5xl font-bold">{{ $t('texts.forbidden_short_message') }}</h1>
    <p class="lg:text-2xl mt-5 mb-14 text-center px-10 lg:px-0">
      {{ $t('texts.forbidden_long_message') }}
    </p>
    <button-return-home />
  </main>
</template>
<script setup>
import IconForbidden from '@/components/icons/forbidden/IconForbidden.vue'
import IconForbiddenCircles from '@/components/icons/forbidden/IconForbiddenCircles.vue'
import ButtonReturnHome from '@/components/ui/buttons/ButtonReturnHome.vue'
</script>