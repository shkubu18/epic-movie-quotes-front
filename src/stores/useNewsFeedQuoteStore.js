import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNewsFeedQuoteStore = defineStore('useNewsFeedQuoteStore', () => {
  const quotes = ref([])
  const searchedQuotes = ref([])
  const searchingQuotesIsActive = ref(false)
  const noQuotesSearchResult = ref(false)

  function addNewsFeedQuotes(newQuotes) {
    quotes.value = [...quotes.value, ...newQuotes]
  }

  function addSearchedQuotes(quotes) {
    searchingQuotesIsActive.value = true
    searchedQuotes.value = [...quotes]
    noQuotesSearchResult.value = quotes.length === 0
  }

  return {
    quotes,
    addNewsFeedQuotes,
    searchedQuotes,
    addSearchedQuotes,
    searchingQuotesIsActive,
    noQuotesSearchResult
  }
})
