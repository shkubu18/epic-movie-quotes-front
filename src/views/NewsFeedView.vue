<template>
  <quote-add-modal :api-url-for-pictures="apiUrlForPictures" v-if="modals.quoteAddModal" />
  <transition
    enter-active-class="duration-500"
    enter-from-class="-translate-x-full"
    leave-active-class="-translate-x-full duration-500 ease"
  >
    <mobile-menu-modal v-if="modals.mobileMenuModal" />
  </transition>

  <transition
    enter-active-class="duration-500"
    enter-from-class="-translate-y-full"
    leave-active-class="-translate-y-full duration-500 ease"
  >
    <mobile-news-feed-search-modal v-if="modals.mobileNewsFeedSearchModal" v-model="searchText" />
  </transition>

  <the-header :quote-modal-for-newsfeed="true" />
  <main class="bg-darker-blue min-h-screen flex justify-center" @click="closeActiveModals">
    <the-aside :api-url-for-pictures="apiUrlForPictures" />
    <div class="flex justify-center py-7 flex-col items-center w-full h-fit">
      <div class="w-full lg:w-940 mb-4 flex items-center justify-between">
        <button-news-feed-add-quote
          :is-search-bar-open="isSearchBarOpen"
          @click="openQuoteAddModal"
        />
        <input-news-feed-search
          :is-search-bar-open="isSearchBarOpen"
          @click="openSearchBar"
          v-model="searchText"
          @close-search-bar="closeSearchBar"
        />
      </div>
      <news-feed-searched-quotes
        v-if="searchingQuotesIsActive"
        :api-url-for-pictures="apiUrlForPictures"
      />
      <news-feed-quotes v-else :api-url-for-pictures="apiUrlForPictures" />
    </div>
  </main>
</template>
<script setup>
import TheHeader from '@/components/shared/TheHeader.vue'
import TheAside from '@/components/shared/TheAside.vue'
import ButtonNewsFeedAddQuote from '@/components/ui/buttons/ButtonNewsFeedAddQuote.vue'
import InputNewsFeedSearch from '@/components/ui/inputs/InputNewsFeedSearch.vue'
import NewsFeedSearchedQuotes from '@/components/newsfeed/NewsFeedSearchedQuotes.vue'
import NewsFeedQuotes from '@/components/newsfeed/NewsFeedQuotes.vue'
import QuoteAddModal from '@/components/modals/quotes/QuoteAddModal.vue'
import { useNewsFeedQuoteStore } from '@/stores/useNewsFeedQuoteStore'
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useModalStore } from '@/stores/useModalStore'
import { useUserStore } from '@/stores/useUserStore'
import { deleteLikeNotification } from '@/services/api/notifications'
import MobileMenuModal from '@/components/modals/MobileMenuModal.vue'
import MobileNewsFeedSearchModal from '@/components/modals/MobileNewsFeedSearchModal.vue'

const apiUrlForPictures = import.meta.env.VITE_API_BASE_URL + '/storage/'

const modalStore = useModalStore()
const { modals } = storeToRefs(modalStore)

const newsFeedQuoteStore = useNewsFeedQuoteStore()
const { searchingQuotesIsActive } = storeToRefs(newsFeedQuoteStore)

const userStore = useUserStore()
const { user } = storeToRefs(userStore)
const { isNotificationsAlreadyFetched } = storeToRefs(userStore)

const isSearchBarOpen = ref(false)
const searchText = ref('')

const closeSearchBar = () => {
  searchingQuotesIsActive.value = false
  isSearchBarOpen.value = false
}

const openQuoteAddModal = () => {
  isSearchBarOpen.value = false
  searchText.value = ''
  searchingQuotesIsActive.value = false
  modalStore.toggleModalVisibility('quoteAddModal')
}

const closeActiveModals = () => {
  if (modals.value.mobileMenuModal || modals.value.mobileNewsFeedSearchModal) {
    modalStore.closeActiveModal()
  }
}

const openSearchBar = () => (isSearchBarOpen.value = true)

onMounted(async () => {
  window.Echo.channel('comments').listen('CommentAdded', (data) => {
    const newComment = {
      id: data.id,
      body: data.body,
      user: {
        username: data.sender.username,
        profile_picture: data.sender.profile_picture
      }
    }

    if (data.sender !== user.value.username) {
      newsFeedQuoteStore.addComment(newComment, data.quote_id)
    }
  })

  window.Echo.channel('likes').listen('Likes\\LikeAdded', (data) => {
    if (data.like.sender !== user.value.username) {
      console.log('asdsa')
      newsFeedQuoteStore.addLike(data.like.quote_id)
    }
  })

  window.Echo.channel('likes').listen('Likes\\LikeRemoved', (data) => {
    if (data.sender !== user.value.username) {
      newsFeedQuoteStore.removeLike(data.quote_id)
      deleteLikeNotification(data.notification_id)
      isNotificationsAlreadyFetched.value = false
    }
  })
})
</script>