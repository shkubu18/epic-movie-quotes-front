<template>
  <div class="h-screen bg-gray-950">
    <landing-header />
    <div class="flex items-center justify-center flex-col h-full -mt-24">
      <h1
        class="text-6xl text-yellow text-center font-bold leading-normal mb-6 font-[montserrat-bold]"
      >
        Find any quote in <br />millions of movie lines
      </h1>
      <button-base class="bg-red text-xl py-2.5">Get Started</button-base>
    </div>
  </div>
  <landing-quotes />
  <landing-footer />
</template>
<script setup>
import ButtonBase from '@/components/ui/ButtonBase.vue'
import LandingQuotes from '@/components/landing/LandingQuotes.vue'
import LandingHeader from '@/components/landing/LandingHeader.vue'
import LandingFooter from '@/components/landing/LandingFooter.vue'
</script>