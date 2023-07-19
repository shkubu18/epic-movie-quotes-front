import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNewsFeedQuoteStore = defineStore('useNewsFeedQuoteStore', () => {
  const quotes = ref([])
  const searchedQuotes = ref([])
  const searchingQuotesIsActive = ref(false)
  const noQuotesSearchResult = ref(false)
  const isQuotesAlreadyFetched = ref(false)
  const page = ref(1)
  const lastPage = ref(0)

  function addNewsFeedQuotes(newQuotes) {
    quotes.value = [...quotes.value, ...newQuotes]
  }

  function addSearchedQuotes(quotes) {
    searchingQuotesIsActive.value = true
    searchedQuotes.value = [...quotes]
    noQuotesSearchResult.value = quotes.length === 0
  }

  function addComment(newComment, quoteId) {
    quotes.value.forEach((quote) => {
      if (quote.id === quoteId) {
        if (!quote.comments) {
          quote.comments = []
        }
        if (!quote.total_comments) {
          quote.total_comments = 0
        }

        quote.comments.push(newComment)
        quote.total_comments++
      }
    })
  }

  function addLike(quoteId) {
    quotes.value.forEach((quote) => {
      if (quote.id === quoteId) {
        if (!quote.total_likes) {
          quote.total_likes = 0
        }
        quote.total_likes++
      }
    })
  }

  function removeLike(quoteId) {
    quotes.value.forEach((quote) => {
      if (quote.id === quoteId) {
        if (quote.total_likes && quote.total_likes > 1) {
          quote.total_likes--
        } else {
          delete quote.total_likes
        }
      }
    })
  }

  function resetStore() {
    quotes.value = []
    searchedQuotes.value = []
    searchingQuotesIsActive.value = false
    isQuotesAlreadyFetched.value = false
    page.value = 0
    lastPage.value = 0
  }

  return {
    quotes,
    addNewsFeedQuotes,
    searchedQuotes,
    addSearchedQuotes,
    searchingQuotesIsActive,
    noQuotesSearchResult,
    resetStore,
    isQuotesAlreadyFetched,
    addComment,
    addLike,
    removeLike,
    page,
    lastPage
  }
})
