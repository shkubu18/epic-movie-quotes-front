<template>
  <modal-crud-background modal="quoteViewFromNotificationModal" />
  <div
    class="absolute w-full lg:w-fit lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2 border inset-y-20 lg:inset-y-1/3 lg:left-1/2 z-50 ml-0.5 border-none"
  >
    <icon-modal-close
      @click="toggleModalVisibility('quoteViewFromNotificationModal')"
      class="md:hidden absolute right-5 top-5 cursor-pointer"
    />
    <article v-if="quote.user" class="text-white bg-lighter-black rounded-xl p-5">
      <news-feed-quote-header :quote="quote" :apiUrlForPictures="apiUrlForPictures" />
      <news-feed-quote-section
        :quote="quote"
        :apiUrlForPictures="apiUrlForPictures"
        :quote-view-from-notification="true"
      />
      <news-feed-quote-footer
        :quote="quote"
        :apiUrlForPictures="apiUrlForPictures"
        :quote-view-from-notification="true"
      />
    </article>
    <icon-loading-spinner v-else class="mt-10" />
  </div>
</template>
<script setup>
import ModalCrudBackground from '@/components/shared/modals/ModalCrudBackground.vue'
import { onMounted, ref } from 'vue'
import { getQuote } from '@/services/api/quotes'
import IconLoadingSpinner from '@/components/icons/IconLoadingSpinner.vue'
import NewsFeedQuoteHeader from '@/components/newsfeed/quote/NewsFeedQuoteHeader.vue'
import NewsFeedQuoteSection from '@/components/newsfeed/quote/NewsFeedQuoteSection.vue'
import NewsFeedQuoteFooter from '@/components/newsfeed/quote/NewsFeedQuoteFooter.vue'
import { useRouter } from 'vue-router'
import IconModalClose from '@/components/icons/IconModalClose.vue'
import { useModalStore } from '@/stores/useModalStore'

const props = defineProps({
  quoteId: {
    required: true,
    type: [Number, null]
  }
})

const router = useRouter()

const apiUrlForPictures = import.meta.env.VITE_API_BASE_URL + '/storage/'

const modalStore = useModalStore()

const toggleModalVisibility = (modalName) => {
  modalStore.toggleModalVisibility(modalName)
}

const quote = ref({})

onMounted(async () => {
  if (props.quoteId) {
    await getQuote(props.quoteId)
      .then((response) => {
        if (response.status === 200) {
          quote.value = response.data.quote
        }
      })
      .catch(() => {
        router.replace({ name: '403' })
      })
  }
})
</script>