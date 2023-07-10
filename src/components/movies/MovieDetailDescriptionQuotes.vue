<template>
  <section class="mt-20">
    <div
      class="bg-lighter-black rounded-lg w-7/12 py-6 px-6 relative mb-10"
      v-for="(quote, index) in quotes"
      :key="quote.id"
    >
      <movie-detail-description-quotes-menu
        :quote-menu-state="quoteMenuState"
        :quote-id="quote.id"
        :quote-index="index"
        @get-quote-index="getQuoteIndex"
      />
      <icon-three-dots
        @click="toggleQuoteMenu(quote.id)"
        class="absolute top-5 right-6 cursor-pointer"
      />
      <div class="flex items-center border-b-2 border-default-border-b-color pb-5">
        <img
          class="h-36 w-2/6 rounded-lg object-cover"
          :src="apiUrlForPictures + quote.picture"
          alt="quote picture"
        />
        <p class="text-2xl mt-4 italic pl-10 w-3/4">{{ '“' + quote.name.en + '.”' }}</p>
      </div>
      <div class="flex mt-6 text-xl">
        <div class="flex items-center mr-8">
          <span class="mr-4">{{ quote.total_comments }}</span>
          <icon-comment />
        </div>
        <div class="flex items-center">
          <span class="mr-4">{{ quote.total_likes }}</span>
          <icon-like :quote-id="quote.id" />
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import IconLike from '@/components/icons/likes/IconLike.vue'
import IconThreeDots from '@/components/icons/IconThreeDots.vue'
import IconComment from '@/components/icons/IconComment.vue'
import { ref } from 'vue'
import MovieDetailDescriptionQuotesMenu from '@/components/movies/MovieDetailDescriptionQuotesMenu.vue'

defineProps({
  apiUrlForPictures: {
    required: true,
    type: String
  },
  quotes: {
    required: true,
    type: [Array, null]
  }
})

const emits = defineEmits(['getQuote'])

const quoteMenuState = ref([])

const toggleQuoteMenu = (quoteId) => {
  quoteMenuState.value[quoteId] = !quoteMenuState.value[quoteId]
}

const getQuoteIndex = (quoteIndex, quoteId, action) => {
  quoteMenuState.value[quoteId] = !quoteMenuState.value[quoteId]
  emits('getQuote', quoteIndex, action)
}
</script>