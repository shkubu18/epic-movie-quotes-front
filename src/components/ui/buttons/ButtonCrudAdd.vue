<template>
  <button-base
    :class="{ 'text-xs': $i18n.locale === 'ka' }"
    class="bg-red py-2.5 !px-4 lg:text-xl flex items-center"
  >
    <icon-add class="mr-2" />
    <slot />
  </button-base>
</template>
<script setup>
import ButtonBase from '@/components/ui/buttons/ButtonBase.vue'
import IconAdd from '@/components/icons/crud/IconAdd.vue'
</script>