<template>
  <div
    :class="{
      'flex text-white py-3 px-4 rounded-xl bg-dark-blue items-center cursor-pointer': true,
      'w-full': !isSearchBarOpen,
      'w-60 justify-between': isSearchBarOpen
    }"
  >
    <icon-write-new-quote />
    <span class="text-xl ml-5">Write new quote</span>
  </div>
</template>
<script setup>
import IconWriteNewQuote from '@/components/icons/quotes/IconWriteNewQuote.vue'

defineProps({
  isSearchBarOpen: {
    required: true,
    type: Boolean
  }
})
</script>