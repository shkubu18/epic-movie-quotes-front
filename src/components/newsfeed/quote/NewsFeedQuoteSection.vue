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
          :quote-id="quote.id"
          @click="addLike(quote.id)"
          :class="!quoteViewFromNotification ? 'cursor-pointer' : 'cursor-auto'"
        />
      </div>
    </div>
  </section>
</template>
<script setup>
import IconComment from '@/components/icons/IconComment.vue'
import IconLike from '@/components/icons/likes/IconLike.vue'
import { storeLike } from '@/services/api/quotes'
import { useUserStore } from '@/stores/useUserStore'
import { storeToRefs } from 'pinia'
import { useNewsFeedQuoteStore } from '@/stores/useNewsFeedQuoteStore'

const props = defineProps({
  quote: {
    required: true,
    type: Object
  },
  apiUrlForPictures: {
    required: true,
    type: String
  },
  quoteViewFromNotification: {
    required: false,
    type: Boolean
  }
})

const userStore = useUserStore()
const { likedQuotes } = storeToRefs(userStore)

const newsFeedQuoteStore = useNewsFeedQuoteStore()

function addLike(quoteId) {
  if (!props.quoteViewFromNotification) {
    if (!likedQuotes.value.includes(quoteId)) {
      newsFeedQuoteStore.addLike(quoteId)

      likedQuotes.value.push(quoteId)
    } else {
      newsFeedQuoteStore.removeLike(quoteId)
      const index = likedQuotes.value.indexOf(quoteId)
      likedQuotes.value.splice(index, 1)
    }

    storeLike(quoteId)
  }
}
</script>