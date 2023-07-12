<template>
  <RouterView />
</template>

<script setup>
import { onMounted } from 'vue'
import instantiatePusher from '@/helpers/instantiatePusher'

onMounted(() => {
  instantiatePusher()
})
</script>