<template>
  <modal-background modal="notificationModal" class="top-0 backdrop-blur-none" />
  <div
    v-show="modals.notificationModal"
    @scroll="handleScroll"
    ref="notificationsContainer"
    class="absolute w-full lg:w-1/2 bg-black h-750 lg:h-810 lg:right-16 top-20 lg:top-24 z-30 py-6 lg:py-12 px-6 lg:px-8 overflow-y-scroll rounded-xl mt-1.5"
    style="scrollbar-width: none"
  >
    <header class="w-full pb-6 lg:p-0 flex items-center justify-between text-white relative">
      <h1 class="text-xl lg:text-3xl">{{ $t('notifications.notifications') }}</h1>
      <h3
        @click="markAllAsRead"
        class="text-xs lg:text-xl underline underline-offset-2 cursor-pointer"
      >
        {{ $t('notifications.mark_all_as_read') }}
      </h3>
    </header>
    <div v-if="notifications.length > 0" class="lg:mt-5">
      <notification-card
        v-for="notification in notifications"
        :key="notification.id"
        :notification="notification"
        class="mb-4 last:m-0"
        @click="getQuoteId(notification.quote_id)"
      />
      <icon-loading-spinner v-if="isLoading" class="mt-10 flex justify-center" />
    </div>
    <h1 v-else class="text-white text-2xl mt-14 text-center">
      {{ $t('notifications.there_are_no_notifications_at_this_moment') }}
    </h1>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/useUserStore'
import { storeToRefs } from 'pinia'
import { onMounted, ref, watch } from 'vue'
import IconLoadingSpinner from '@/components/icons/IconLoadingSpinner.vue'
import NotificationCard from '@/components/notifications/NotificationCard.vue'
import { getUserNotifications, markAllNotificationsAsRead } from '@/services/api/notifications'
import { useRouter } from 'vue-router'
import { useModalStore } from '@/stores/useModalStore'
import ModalBackground from '@/components/shared/modals/ModalBackground.vue'

const emits = defineEmits(['openQuoteViewFromNotificationModal'])

const router = useRouter()

const modalStore = useModalStore()
const { modals } = storeToRefs(modalStore)
const { toggleModalVisibility } = modalStore

const getQuoteId = (quoteId) => {
  emits('openQuoteViewFromNotificationModal', quoteId)
}

const userStore = useUserStore()
const { notifications } = storeToRefs(userStore)
const { isNotificationsAlreadyFetched } = storeToRefs(userStore)
const { unreadNotificationsCount } = storeToRefs(userStore)

const notificationsContainer = ref(null)

const page = ref(1)
const lastPage = ref()
const isLoading = ref(false)

const markAllAsRead = async () => {
  if (unreadNotificationsCount.value) {
    await markAllNotificationsAsRead().then((response) => {
      if (response.status === 200) {
        isNotificationsAlreadyFetched.value = false
      }
    })
  }
}

watch(isNotificationsAlreadyFetched, (newValue) => {
  if (!newValue) {
    page.value = 1
    notifications.value = []
    getNotifications()
  }
})

const getNotifications = async () => {
  isLoading.value = true
  await getUserNotifications(page.value)
    .then((response) => {
      if (response.status === 200) {
        lastPage.value = response.data.last_page
        unreadNotificationsCount.value = response.data.unread_notifications_count
        const newNotifications = response.data.notifications
        notifications.value = [...notifications.value, ...newNotifications]
        page.value++
      }
    })
    .catch(() => {
      router.replace({ name: '403' })
    })
    .finally(() => {
      isLoading.value = false
      isNotificationsAlreadyFetched.value = true
    })
}

const handleScroll = () => {
  const { scrollTop, clientHeight, scrollHeight } = notificationsContainer.value
  if (scrollTop + clientHeight >= scrollHeight && !isLoading.value) {
    if (page.value <= lastPage.value) {
      getNotifications()
    }
  }
}

onMounted(() => {
  if (!isNotificationsAlreadyFetched.value) {
    getNotifications()
  }
})
</script>