<template>
  <h1 v-if="noQuotesSearchResult" class="text-white text-3xl mt-16">No quotes search result...</h1>
  <article
    v-for="quote in searchedQuotes"
    :key="quote.id"
    class="text-center text-white bg-black w-940 rounded-xl p-5 mb-10"
  >
    <news-feed-quote-header :quote="quote" :apiUrl="apiUrl" />
    <news-feed-quote-section :quote="quote" :apiUrl="apiUrl" />
    <news-feed-quote-footer :quote="quote" :apiUrl="apiUrl" />
  </article>
</template>
<script setup>
import NewsFeedQuoteHeader from '@/components/newsfeed/quote/NewsFeedQuoteHeader.vue'
import NewsFeedQuoteSection from '@/components/newsfeed/quote/NewsFeedQuoteSection.vue'
import NewsFeedQuoteFooter from '@/components/newsfeed/quote/NewsFeedQuoteFooter.vue'
import { useNewsFeedQuoteStore } from '@/stores/useNewsFeedQuoteStore'
import { storeToRefs } from 'pinia'

defineProps({
  apiUrl: {
    required: true,
    type: String
  }
})

const newsFeedQuoteStore = useNewsFeedQuoteStore()
const { searchedQuotes } = storeToRefs(newsFeedQuoteStore)
const { noQuotesSearchResult } = storeToRefs(newsFeedQuoteStore)
</script>