<template>
  <div
    :class="{
      'flex text-white pt-3 pb-5 px-7 md:py-3 md:px-4 rounded-xl bg-darker-blue md:bg-dark-blue items-center cursor-pointer': true,
      'w-full': !isSearchBarOpen,
      'justify-between': isSearchBarOpen
    }"
  >
    <icon-write-new-quote />
    <span class="text-xl ml-5">{{ $t('quotes.write_new_quote') }}</span>
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