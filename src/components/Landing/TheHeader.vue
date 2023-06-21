<template>
  <header class="flex justify-between px-16 py-7">
    <h1 class="text-yellow">MOVIE QUOTES</h1>
    <div class="flex">
      <language-switcher />
      <the-button class="bg-red mr-3.5">Sign Up</the-button>
      <the-button class="border-2">Log In</the-button>
    </div>
  </header>
</template>
<script setup>
import TheButton from '@/components/ui/TheButton.vue'
import LanguageSwitcher from '@/components/shared/LanguageSwitcher.vue'
</script>