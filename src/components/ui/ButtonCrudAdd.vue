<template>
  <button-base class="bg-red py-2.5 !px-4 text-xl flex items-center">
    <icon-add class="mr-2" />
    <slot />
  </button-base>
</template>
<script setup>
import ButtonBase from '@/components/ui/ButtonBase.vue'
import IconAdd from '@/components/icons/IconAdd.vue'
</script>