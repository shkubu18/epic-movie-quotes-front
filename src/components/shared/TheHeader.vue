<template>
  <quote-modal-view-from-notification
    :quote-id="quoteIdForView"
    v-if="modals.quoteViewFromNotificationModal"
  />
  <transition
    enter-active-class="duration-500"
    enter-from-class="-translate-x-full"
    leave-active-class="-translate-x-full duration-500 ease"
  >
    <mobile-modal-menu v-if="modals.mobileMenuModal" />
  </transition>

  <header
    v-show="isQuoteModalsInactive || quoteModalForNewsfeed"
    class="flex justify-between items-center px-7 lg:px-16 py-7 bg-dark-blue relative"
  >
    <h1 class="hidden lg:block text-yellow">MOVIE QUOTES</h1>
    <icon-menu-bar
      class="lg:hidden cursor-pointer"
      @click="toggleModalVisibility('mobileMenuModal')"
    />
    <div class="flex items-center">
      <icon-search-bar
        v-if="route.path === '/newsfeed'"
        class="mr-5 lg:hidden cursor-pointer"
        @click="toggleModalVisibility('mobileNewsFeedSearchModal')"
      />
      <div @click="toggleNotifications" class="relative md:mr-9">
        <icon-notification class="cursor-pointer" />
        <div
          v-if="unreadNotificationsCount && notifications.length"
          class="absolute -top-1.5 -right-5 mr-2.5 lg:mr-2 text-white bg-notification-circle-color cursor-pointer rounded-full w-5 h-5 lg:w-6 lg:h-6 flex justify-center items-center"
        >
          <span>{{ unreadNotificationsCount }}</span>
        </div>
      </div>
      <language-switcher class="hidden lg:block" />
      <button-base @click="logoutUser" class="hidden lg:block border-2"
        >{{ $t('auth.logout') }}
      </button-base>
    </div>
    <teleport to="body">
      <notification-list
        @open-quote-view-from-notification-modal="openQuoteViewFromNotificationModal"
      />
    </teleport>
    <icon-arrow-up
      v-show="isNotificationsOpen"
      :class="{
        'absolute top-16 lg:top-20 right-3 lg:right-72 mr-1.5': true,
        'lg:!mr-6': $i18n.locale === 'ka'
      }"
    />
  </header>
</template>
<script setup>
import IconNotification from '@/components/icons/IconNotification.vue'
import LanguageSwitcher from '@/components/shared/LanguageSwitcher.vue'
import ButtonBase from '@/components/ui/buttons/ButtonBase.vue'
import { logout } from '@/services/api/auth'
import { useRoute, useRouter } from 'vue-router'
import { useMovieStore } from '@/stores/useMovieStore'
import { useNewsFeedQuoteStore } from '@/stores/useNewsFeedQuoteStore'
import { useUserStore } from '@/stores/useUserStore'
import { computed, ref } from 'vue'
import { useModalStore } from '@/stores/useModalStore'
import { storeToRefs } from 'pinia'
import NotificationList from '@/components/notifications/NotificationList.vue'
import IconArrowUp from '@/components/icons/arrows/IconArrowUp.vue'
import QuoteModalViewFromNotification from '@/components/quote/QuoteModalViewFromNotification.vue'
import IconMenuBar from '@/components/icons/IconMenuBar.vue'
import IconSearchBar from '@/components/icons/IconSearchBar.vue'
import MobileModalMenu from '@/components/mobile/MobileModalMenu.vue'

defineProps({
  quoteModalForNewsfeed: {
    required: false,
    type: Boolean,
    default: false
  }
})

const router = useRouter()
const route = useRoute()

const quoteIdForView = ref(null)

const movieStore = useMovieStore()
const newsFeedQuoteStore = useNewsFeedQuoteStore()

const userStore = useUserStore()
const { notifications } = storeToRefs(userStore)
const { unreadNotificationsCount } = storeToRefs(userStore)

const modalStore = useModalStore()
const { modals } = storeToRefs(modalStore)

const toggleModalVisibility = (modalName) => {
  modalStore.toggleModalVisibility(modalName)
}

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
  toggleModalVisibility('notificationModal')
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