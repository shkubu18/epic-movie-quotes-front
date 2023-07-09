<template>
  <section>
    <img
      class="w-890 h-500 rounded-xl object-cover"
      :src="apiUrlForPictures + quote.picture"
      alt="quote picture"
    />
    <div class="text-left mt-6 text-xl flex pb-7 border-b-2 border-default-border-b-color">
      <div class="flex items-center mr-8">
        <span class="mr-4">{{ quote.total_comments }}</span>
        <icon-comment />
      </div>
      <div class="flex items-center">
        <span class="mr-4">{{ quote.total_likes }}</span>
        <icon-like
          :is-liked="isLiked(quote.id)"
          @click="addLike(quote.id)"
          class="cursor-pointer"
        />
      </div>
    </div>
  </section>
</template>
<script setup>
import IconComment from '@/components/icons/IconComment.vue'
import IconLike from '@/components/icons/IconLike.vue'
import { storeLike } from '@/services/api/quotes'
import { useUserStore } from '@/stores/useUserStore'
import { storeToRefs } from 'pinia'
import { useNewsFeedQuoteStore } from '@/stores/useNewsFeedQuoteStore'

defineProps({
  quote: {
    required: true,
    type: Object
  },
  apiUrlForPictures: {
    required: true,
    type: String
  }
})

const userStore = useUserStore()
const { likedQuotes } = storeToRefs(userStore)

const newsFeedQuoteStore = useNewsFeedQuoteStore()
const { quotes } = storeToRefs(newsFeedQuoteStore)

function isLiked(quoteId) {
  return likedQuotes.value.includes(quoteId)
}

function addLike(quoteId) {
  if (!likedQuotes.value.includes(quoteId)) {
    quotes.value.forEach((quote) => {
      if (quote.id === quoteId) {
        if (!quote.total_likes) {
          quote.total_likes = 0
        }
        quote.total_likes++
      }
    })
    likedQuotes.value.push(quoteId)
  } else {
    quotes.value.forEach((quote) => {
      if (quote.id === quoteId) {
        if (quote.total_likes && quote.total_likes > 1) {
          quote.total_likes--
        } else {
          delete quote.total_likes
        }
      }
    })
    const index = likedQuotes.value.indexOf(quoteId)
    likedQuotes.value.splice(index, 1)
  }

  storeLike(quoteId)
}
</script>