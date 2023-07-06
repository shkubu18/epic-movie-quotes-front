<template>
  <the-header />
  <main class="bg-darker-blue min-h-screen flex justify-center">
    <the-aside :api-url-for-pictures="apiUrlForPictures" />
    <div class="flex justify-center py-7 flex-col items-center w-fit h-fit">
      <div class="w-940 mb-4 flex items-center justify-between">
        <button-news-feed-add-quote :is-search-bar-open="isSearchBarOpen" @click="closeSearchBar" />
        <input-news-feed-search
          :is-search-bar-open="isSearchBarOpen"
          @click="openSearchBar"
          v-model="searchText"
          @reset-quote-store="resetQuoteStore"
        />
      </div>
      <news-feed-searched-quotes
        v-if="searchingQuotesIsActive"
        :api-url-for-pictures="apiUrlForPictures"
      />
      <news-feed-quotes v-else :api-url-for-pictures="apiUrlForPictures" />
    </div>
  </main>
</template>
<script setup>
import TheHeader from '@/components/shared/TheHeader.vue'
import TheAside from '@/components/shared/TheAside.vue'
import ButtonNewsFeedAddQuote from '@/components/ui/ButtonNewsFeedAddQuote.vue'
import InputNewsFeedSearch from '@/components/ui/InputNewsFeedSearch.vue'
import NewsFeedSearchedQuotes from '@/components/newsfeed/NewsFeedSearchedQuotes.vue'
import NewsFeedQuotes from '@/components/newsfeed/NewsFeedQuotes.vue'
import { useNewsFeedQuoteStore } from '@/stores/useNewsFeedQuoteStore'
import { ref } from 'vue'
import { storeToRefs } from 'pinia'

const apiUrlForPictures = import.meta.env.VITE_API_BASE_URL + '/storage/'

const newsFeedQuoteStore = useNewsFeedQuoteStore()
const { searchingQuotesIsActive } = storeToRefs(newsFeedQuoteStore)

const isSearchBarOpen = ref(false)
const searchText = ref('')

const resetQuoteStore = () => {
  newsFeedQuoteStore.resetStore()
}

const closeSearchBar = () => {
  isSearchBarOpen.value = false
  searchText.value = ''
  searchingQuotesIsActive.value = false
}
const openSearchBar = () => (isSearchBarOpen.value = true)
</script>