<template>
  <div
    @click="markAsRead(notification.id, notification.read)"
    class="w-full flex flex-col lg:flex-row justify-between rounded border-2 border-custom-gray text-white p-4 cursor-pointer"
  >
    <div class="flex items-center">
      <img
        :class="{
          'h-14 w-14 lg:h-20 lg:w-20 rounded-full mr-6 object-cover': true,
          'border-3 border-green': !notification.read
        }"
        :src="
          notification.sender.profile_picture
            ? apiUrlForPictures + notification.sender.profile_picture
            : 'https://www.citypng.com/public/uploads/preview/png-round-blue-contact-user-profile-icon-11639786938sxvzj5ogua.png'
        "
        alt="profile picture"
      />
      <div class="flex flex-col lg:text-xl">
        <h2 class="text-xl lg:text-2xl">{{ notification.sender.username }}</h2>
        <span v-if="notification.type === 'comment'" class="cursor-pointer text-gray-200 flex mt-2">
          <icon-quote style="height: 24px" class="mr-2" />
          {{ $t('notifications.commented_to_your_movie_quote') }}
        </span>
        <span v-else class="cursor-pointer text-gray-200 flex mt-2">
          <icon-liked style="height: 24px" class="mr-2" />
          {{ $t('notifications.reacted_to_your_quote') }}
        </span>
      </div>
    </div>
    <div class="flex items-end pl-2 lg:flex-col mt-3 text-xl">
      <span class="order-2 lg:order-1">{{
        getNotificationReceiveTime(notification.created_at)
      }}</span>
      <span v-if="!notification.read" class="mt-2 text-green text-end mr-7 order-1 lg:order-2">
        {{ $t('notifications.new') }}
      </span>
    </div>
  </div>
</template>

<script setup>
import IconQuote from '@/components/icons/quotes/IconQuote.vue'
import IconLiked from '@/components/icons/likes/IconLiked.vue'
import { markNotificationAsRead } from '@/services/api/notifications'
import { useUserStore } from '@/stores/useUserStore'
import { storeToRefs } from 'pinia'
import calculateNotificationReceiveTime from '@/helpers/calculateNotificationReceiveTime'

defineProps({
  notification: {
    required: true,
    type: Object
  }
})

const apiUrlForPictures = import.meta.env.VITE_API_BASE_URL + '/storage/'

const userStore = useUserStore()
const { isNotificationsAlreadyFetched } = storeToRefs(userStore)

const getNotificationReceiveTime = (createdAt) => {
  return calculateNotificationReceiveTime(createdAt)
}

function markAsRead(notificationId, isNotificationAlreadySeen) {
  if (!isNotificationAlreadySeen) {
    markNotificationAsRead(notificationId).then((response) => {
      if (response.status === 201) {
        isNotificationsAlreadyFetched.value = false
      }
    })
  }
}
</script>