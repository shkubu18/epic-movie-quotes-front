<template>
  <section class="mt-20">
    <div
      class="bg-lighter-black rounded-lg w-7/12 py-6 px-6 relative mb-10"
      v-for="quote in quotes"
      :key="quote.id"
    >
      <movie-detail-description-quotes-menu :is-quote-menu-open="isQuoteMenuOpen" />
      <icon-three-dots @click="toggleQuoteMenu" class="absolute top-5 right-6 cursor-pointer" />
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
          <icon-like />
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import IconLike from '@/components/icons/IconLike.vue'
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

const isQuoteMenuOpen = ref(false)

const toggleQuoteMenu = () => {
  isQuoteMenuOpen.value = !isQuoteMenuOpen.value
}
</script>