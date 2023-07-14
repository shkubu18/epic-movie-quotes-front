<template>
  <quote-view-from-notification-modal
    :quote-id="quoteIdForView"
    v-if="modals.quoteViewFromNotificationModal"
  />
  <header
    v-show="isQuoteModalsInactive || quoteModalForNewsfeed"
    class="flex justify-between items-center px-16 py-7 bg-dark-blue relative"
  >
    <h1 class="text-yellow">MOVIE QUOTES</h1>
    <div class="flex items-center">
      <div @click="toggleNotifications" class="relative mr-9">
        <icon-notification class="cursor-pointer" />
        <div
          v-if="unreadNotificationsCount && notifications.length"
          class="absolute -top-1.5 -right-5 mr-2 text-white bg-notification-circle-color cursor-pointer rounded-full w-6 flex justify-center"
        >
          <span>{{ unreadNotificationsCount }}</span>
        </div>
      </div>
      <language-switcher />
      <button-base @click="logoutUser" class="border-2">{{ $t('auth.logout') }}</button-base>
    </div>
    <notification-list
      v-show="isNotificationsOpen"
      @open-quote-view-from-notification-modal="openQuoteViewFromNotificationModal"
    />
    <icon-arrow-up
      v-show="isNotificationsOpen"
      :class="{
        'absolute top-20 right-72 mr-1': true,
        '!mr-6': $i18n.locale === 'ka'
      }"
    />
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
import { computed, ref } from 'vue'
import { useModalStore } from '@/stores/useModalStore'
import { storeToRefs } from 'pinia'
import NotificationList from '@/components/notifications/NotificationList.vue'
import IconArrowUp from '@/components/icons/arrows/IconArrowUp.vue'
import QuoteViewFromNotificationModal from '@/components/modals/quotes/QuoteViewFromNotificationModal.vue'

defineProps({
  quoteModalForNewsfeed: {
    required: false,
    type: Boolean
  }
})

const router = useRouter()

const quoteIdForView = ref(null)

const movieStore = useMovieStore()
const newsFeedQuoteStore = useNewsFeedQuoteStore()

const userStore = useUserStore()
const { notifications } = storeToRefs(userStore)
const { unreadNotificationsCount } = storeToRefs(userStore)

const modalStore = useModalStore()
const { modals } = storeToRefs(modalStore)

const isQuoteModalsInactive = computed(() => {
  return !modals.value.quoteAddModal && !modals.value.quoteViewModal && !modals.value.quoteEditModal
})

const isNotificationsOpen = ref(false)

const openQuoteViewFromNotificationModal = (quoteId) => {
  isNotificationsOpen.value = false
  quoteIdForView.value = quoteId
  modalStore.closeActiveModal()
  modalStore.toggleModalVisibility('quoteViewFromNotificationModal')
}

const toggleNotifications = () => {
  isNotificationsOpen.value = !isNotificationsOpen.value
}

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