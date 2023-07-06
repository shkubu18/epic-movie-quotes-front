<template>
  <div
    v-if="isQuoteMenuOpen"
    class="absolute top-10 -right-48 bg-dark-blue rounded-lg w-60 cursor-pointer"
  >
    <div class="flex items-center hover:bg-darker-blue py-5 pl-9 duration-300 w-full">
      <icon-view />
      <span class="ml-4">View Quote</span>
    </div>
    <div class="flex items-center hover:bg-darker-blue py-5 pl-9 duration-300 w-full">
      <icon-edit />
      <span class="ml-4">Edit</span>
    </div>
    <div class="flex items-center hover:bg-darker-blue py-5 pl-9 duration-300 w-full">
      <icon-delete />
      <span class="ml-4">Delete</span>
    </div>
  </div>
</template>
<script setup>
import IconDelete from '@/components/icons/IconDelete.vue'
import IconEdit from '@/components/icons/IconEdit.vue'
import IconView from '@/components/icons/IconView.vue'

defineProps({
  isQuoteMenuOpen: {
    required: true,
    type: Boolean
  }
})
</script>