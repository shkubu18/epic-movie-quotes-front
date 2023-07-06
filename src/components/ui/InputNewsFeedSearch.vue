<template>
  <div
    :class="{
      'flex items-center relative ml-2 py-4 text-white': true,
      'w-52 cursor-pointer': !isSearchBarOpen,
      'w-680  pl-14 border-b-2 border-newsfeed-quote-border-color': isSearchBarOpen
    }"
  >
    <icon-search-bar class="absolute left-4" />
    <input
      ref="searchInput"
      @keydown.enter="getSearchResult"
      :value="modelValue"
      @input="emits('update:modelValue', $event.target.value)"
      :class="{
        'bg-transparent text-right placeholder:text-gray-300 border-none outline-none w-full text-xl': true,
        '!text-left': isSearchBarOpen,
        'cursor-pointer': !isSearchBarOpen
      }"
      type="text"
      name="search"
      :placeholder="
        isSearchBarOpen ? 'Enter @ to search movies, Enter # to search quotes' : 'Search by'
      "
    />
  </div>
</template>
<script setup>
import IconSearchBar from '@/components/icons/IconSearchBar.vue'
import { useNewsFeedQuoteStore } from '@/stores/useNewsFeedQuoteStore'
import { searchQuotes } from '@/services/api/quotes'
import { ref } from 'vue'

const props = defineProps({
  isSearchBarOpen: {
    required: true,
    type: Boolean
  },
  modelValue: {
    required: true,
    type: String
  }
})

const emits = defineEmits(['update:modelValue', 'closeSearchBar'])

const searchInput = ref(null)

const newsFeedQuoteStore = useNewsFeedQuoteStore()

const getSearchResult = async () => {
  if (props.modelValue.length === 0) {
    searchInput.value.blur()
    emits('closeSearchBar')
  }

  if (props.modelValue.startsWith('#') || props.modelValue.startsWith('@')) {
    if (props.modelValue.length > 1) {
      await searchQuotes(props.modelValue).then((response) => {
        newsFeedQuoteStore.addSearchedQuotes(response.data.quotes)
      })
    }
  }
}
</script>