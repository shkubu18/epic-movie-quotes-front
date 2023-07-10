<template>
  <icon-loading-spinner v-if="isLoading" class="mt-10" />
  <h1 v-if="quotes.length === 0 && !isLoading" class="text-3xl text-white mt-10">
    There are no quotes...
  </h1>
  <article
    v-for="quote in quotes"
    :key="quote.id"
    class="text-center text-white bg-black w-940 rounded-xl p-5 mb-10"
  >
    <news-feed-quote-header :quote="quote" :apiUrlForPictures="apiUrlForPictures" />
    <news-feed-quote-section :quote="quote" :apiUrlForPictures="apiUrlForPictures" />
    <news-feed-quote-footer :quote="quote" :apiUrlForPictures="apiUrlForPictures" />
  </article>
</template>
<script setup>
import IconLoadingSpinner from '@/components/icons/IconLoadingSpinner.vue'
import NewsFeedQuoteHeader from '@/components/newsfeed/quote/NewsFeedQuoteHeader.vue'
import NewsFeedQuoteSection from '@/components/newsfeed/quote/NewsFeedQuoteSection.vue'
import NewsFeedQuoteFooter from '@/components/newsfeed/quote/NewsFeedQuoteFooter.vue'
import { useNewsFeedQuoteStore } from '@/stores/useNewsFeedQuoteStore'
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { fetchNewsFeedQuotes, getLikedQuotes } from '@/services/api/quotes'
import { useRouter } from 'vue-router'
import { useModalStore } from '@/stores/useModalStore'
import { useUserStore } from '@/stores/useUserStore'

defineProps({
  apiUrlForPictures: {
    required: true,
    type: String
  }
})

const router = useRouter()

const modalStore = useModalStore()
const { modals } = storeToRefs(modalStore)

const userStore = useUserStore()
const { likedQuotes } = storeToRefs(userStore)

const newsFeedQuoteStore = useNewsFeedQuoteStore()
const { quotes } = storeToRefs(newsFeedQuoteStore)
const { isQuotesAlreadyFetched } = storeToRefs(newsFeedQuoteStore)

const page = ref(1)
const lastPage = ref()
const isLoading = ref(false)

watch(isQuotesAlreadyFetched, (newValue) => {
  if (!newValue) {
    page.value = 1
    quotes.value = []
    fetchQuotes()
  }
})

const fetchQuotes = async () => {
  isLoading.value = true
  await fetchNewsFeedQuotes(page.value)
    .then((response) => {
      lastPage.value = response.data.last_page
      const newQuotes = response.data.quotes
      newsFeedQuoteStore.addNewsFeedQuotes(newQuotes)
      page.value++
    })
    .catch((error) => {
      if (error) {
        router.replace({ name: '403' })
      }
    })
    .finally(() => {
      isLoading.value = false
      isQuotesAlreadyFetched.value = true
    })
}

onMounted(async () => {
  await getLikedQuotes()
    .then((response) => {
      if (response.status === 200) {
        likedQuotes.value = response.data.liked_quotes
      }
    })
    .catch(() => {
      router.replace({ name: '403' })
    })

  if (!isQuotesAlreadyFetched.value) {
    fetchQuotes()
  }
  window.addEventListener('scroll', handleScrollForQuotes)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScrollForQuotes)
})

const handleScrollForQuotes = () => {
  const { scrollTop, clientHeight, scrollHeight } = document.documentElement

  if (scrollTop + clientHeight >= scrollHeight && !isLoading.value) {
    if (page.value <= lastPage.value && !modals.value.quoteAddModal) {
      fetchQuotes()
    }
  }
}
</script>