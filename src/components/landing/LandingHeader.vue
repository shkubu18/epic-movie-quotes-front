<template>
  <header class="flex justify-between px-16 py-7">
    <h1 class="text-yellow">MOVIE QUOTES</h1>
    <div class="flex">
      <language-switcher />
      <button-base class="bg-red mr-3.5">Sign Up</button-base>
      <button-base class="border-2">Log In</button-base>
    </div>
  </header>
</template>
<script setup>
import LanguageSwitcher from '@/components/shared/LanguageSwitcher.vue'
import ButtonBase from '@/components/ui/ButtonBase.vue'
</script>