import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNewsFeedQuoteStore = defineStore('useNewsFeedQuoteStore', () => {
  const quotes = ref([])
  const searchedQuotes = ref([])
  const searchingQuotesIsActive = ref(false)
  const noQuotesSearchResult = ref(false)
  const isQuotesAlreadyFetched = ref(false)

  function addNewsFeedQuotes(newQuotes) {
    quotes.value = [...quotes.value, ...newQuotes]
  }

  function addSearchedQuotes(quotes) {
    searchingQuotesIsActive.value = true
    searchedQuotes.value = [...quotes]
    noQuotesSearchResult.value = quotes.length === 0
  }

  function resetStore() {
    quotes.value = []
    searchedQuotes.value = []
    searchingQuotesIsActive.value = false
    isQuotesAlreadyFetched.value = false
  }

  return {
    quotes,
    addNewsFeedQuotes,
    searchedQuotes,
    addSearchedQuotes,
    searchingQuotesIsActive,
    noQuotesSearchResult,
    resetStore,
    isQuotesAlreadyFetched
  }
})
