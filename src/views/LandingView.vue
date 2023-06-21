<template>
  <div class="h-screen bg-gray-950">
    <the-header />
    <div class="flex items-center justify-center flex-col h-full -mt-24">
      <h1
        class="text-6xl text-yellow text-center font-bold leading-normal mb-6 font-[montserrat-bold]"
      >
        Find any quote in <br />millions of movie lines
      </h1>
      <the-button class="bg-red text-xl py-2.5">Get Started</the-button>
    </div>
  </div>
  <landing-quotes />
  <the-footer />
</template>
<script setup>
import TheHeader from '@/components/landing/TheHeader.vue'
import TheButton from '@/components/ui/TheButton.vue'
import TheFooter from '@/components/landing/TheFooter.vue'
import LandingQuotes from '@/components/landing/LandingQuotes.vue'
</script>