<template>
  <router-link to="/">
    <button-base class="bg-red text-2xl py-2.5">{{ $t('texts.return_home') }}</button-base>
  </router-link>
</template>
<script setup>
import ButtonBase from '@/components/ui/ButtonBase.vue'
</script>