<template>
  <the-header />
  <main class="bg-darker-blue min-h-screen flex justify-center">
    <the-aside :apiUrl="apiUrl" />
    <div class="flex justify-center py-7 flex-col items-center w-fit h-fit">
      <div class="w-940 mb-4 flex items-center justify-between">
        <button-news-feed-add-quote :isSearchBarOpen="isSearchBarOpen" @click="closeSearchBar" />
        <input-news-feed-search
          :isSearchBarOpen="isSearchBarOpen"
          @click="openSearchBar"
          v-model="searchText"
        />
      </div>
      <news-feed-searched-quotes v-if="searchingQuotesIsActive" :apiUrl="apiUrl" />
      <news-feed-searched-movies v-else-if="searchingMoviesIsActive" :apiUrl="apiUrl" />
      <news-feed-quotes v-else :apiUrl="apiUrl" />
    </div>
  </main>
</template>
<script setup>
import TheHeader from '@/components/shared/TheHeader.vue'
import TheAside from '@/components/shared/TheAside.vue'
import ButtonNewsFeedAddQuote from '@/components/ui/ButtonNewsFeedAddQuote.vue'
import InputNewsFeedSearch from '@/components/ui/InputNewsFeedSearch.vue'
import NewsFeedSearchedQuotes from '@/components/newsfeed/NewsFeedSearchedQuotes.vue'
import NewsFeedSearchedMovies from '@/components/newsfeed/NewsFeedSearchedMovies.vue'
import NewsFeedQuotes from '@/components/newsfeed/NewsFeedQuotes.vue'
import { useNewsFeedQuoteStore } from '@/stores/useNewsFeedQuoteStore'
import { useNewsFeedMovieStore } from '@/stores/useNewsFeedMovieStore'
import { useUserStore } from '@/stores/useUserStore'
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { getUser } from '@/services/api/auth'

const apiUrl = import.meta.env.VITE_API_BASE_URL + '/'

const newsFeedQuoteStore = useNewsFeedQuoteStore()
const { searchingQuotesIsActive } = storeToRefs(newsFeedQuoteStore)

const newsFeedMovieStore = useNewsFeedMovieStore()
const { searchingMoviesIsActive } = storeToRefs(newsFeedMovieStore)

const isSearchBarOpen = ref(false)

const searchText = ref('')

const closeSearchBar = () => {
  isSearchBarOpen.value = false
  searchText.value = ''
  newsFeedQuoteStore.searchingQuotesIsActive = false
  newsFeedMovieStore.searchingMoviesIsActive = false
}
const openSearchBar = () => (isSearchBarOpen.value = true)

const userStore = useUserStore()

onMounted(async () => {
  await getUser().then((response) => {
    userStore.addUser(response.data.user)
  })
})
</script>