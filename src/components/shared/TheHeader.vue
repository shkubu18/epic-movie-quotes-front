<template>
  <header
    v-show="isQuoteModalsInactive || quoteModalForNewsfeed"
    class="flex justify-between items-center px-16 py-7 bg-dark-blue"
  >
    <h1 class="text-yellow">MOVIE QUOTES</h1>
    <div class="flex items-center">
      <icon-notification class="mr-9" />
      <language-switcher />
      <button-base @click="logoutUser" class="border-2">Log out</button-base>
    </div>
  </header>
</template>
<script setup>
import IconNotification from '@/components/icons/IconNotification.vue'
import LanguageSwitcher from '@/components/shared/LanguageSwitcher.vue'
import ButtonBase from '@/components/ui/ButtonBase.vue'
import { logout } from '@/services/api/auth'
import { useRouter } from 'vue-router'
import { useMovieStore } from '@/stores/useMovieStore'
import { useNewsFeedQuoteStore } from '@/stores/useNewsFeedQuoteStore'
import { useUserStore } from '@/stores/useUserStore'
import { computed } from 'vue'
import { useModalStore } from '@/stores/useModalStore'
import { storeToRefs } from 'pinia'

defineProps({
  quoteModalForNewsfeed: {
    required: false,
    type: Boolean
  }
})

const router = useRouter()

const movieStore = useMovieStore()
const newsFeedQuoteStore = useNewsFeedQuoteStore()
const userStore = useUserStore()

const modalStore = useModalStore()
const { modals } = storeToRefs(modalStore)

const isQuoteModalsInactive = computed(() => {
  return !modals.value.quoteAddModal && !modals.value.quoteViewModal && !modals.value.quoteEditModal
})

const logoutUser = async () => {
  await logout().then((response) => {
    if (response.status === 200) {
      router.replace({ name: 'landing' })

      setTimeout(() => {
        movieStore.resetStore()
        newsFeedQuoteStore.resetStore()
        userStore.resetStore()
      }, 1000)
    }
  })
}
</script>