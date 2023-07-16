<template>
  <button-base @click="router.back()" class="bg-red text-2xl py-2.5">
    {{ $t('texts.return_home') }}
  </button-base>
</template>
<script setup>
import ButtonBase from '@/components/ui/buttons/ButtonBase.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>