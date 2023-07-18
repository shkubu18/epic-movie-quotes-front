<template>
  <div
    v-if="quoteMenuState[quoteId]"
    class="absolute bottom-12 right-5 lg:top-10 lg:-right-48 bg-dark-blue rounded-lg w-60 cursor-pointer"
  >
    <div
      @click="emits('getQuoteIndex', quoteIndex, quoteId, 'view')"
      class="flex items-center hover:bg-darker-blue py-5 pl-9 duration-300 w-full"
    >
      <icon-view />
      <span class="ml-4">{{ $t('quotes.view_quote') }}</span>
    </div>
    <div
      @click="emits('getQuoteIndex', quoteIndex, quoteId, 'edit')"
      class="flex items-center hover:bg-darker-blue py-5 pl-9 duration-300 w-full"
    >
      <icon-edit />
      <span class="ml-4">{{ $t('texts.edit') }}</span>
    </div>
    <div
      @click="deleteQuote(quoteId)"
      class="flex items-center hover:bg-darker-blue py-5 pl-9 duration-300 w-full"
    >
      <icon-delete />
      <span class="ml-4">{{ $t('texts.delete') }}</span>
    </div>
  </div>
</template>
<script setup>
import IconDelete from '@/components/icons/crud/IconDelete.vue'
import IconEdit from '@/components/icons/crud/IconEdit.vue'
import IconView from '@/components/icons/crud/IconView.vue'
import { destroyQuote } from '@/services/api/quotes'
import { useMovieStore } from '@/stores/useMovieStore'
import { storeToRefs } from 'pinia'
import { useNewsFeedQuoteStore } from '@/stores/useNewsFeedQuoteStore'

defineProps({
  quoteMenuState: {
    required: true,
    type: Array
  },
  quoteId: {
    required: true,
    type: Number
  },
  quoteIndex: {
    required: true,
    type: Number
  }
})

const emits = defineEmits(['getQuoteIndex'])

const movieStore = useMovieStore()
const { isMovieUpdated } = storeToRefs(movieStore)

const newsFeedQuoteStore = useNewsFeedQuoteStore()

const deleteQuote = async (quoteId) => {
  await destroyQuote(quoteId).then((response) => {
    if (response.status === 200) {
      isMovieUpdated.value = true
      newsFeedQuoteStore.resetStore()
    }
  })
}
</script>