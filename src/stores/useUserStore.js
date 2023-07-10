import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('useUserStore', () => {
  const user = ref({})
  const isUserAlreadyFetched = ref(false)
  const likedQuotes = ref([])
  const notifications = ref([])
  const isNotificationsAlreadyFetched = ref(false)
  const isNotificationsSeen = ref(false)
  const unreadNotificationsCount = ref(null)
  const quoteFromNotification = ref({})

  function addUser(userInfo) {
    user.value = userInfo
  }

  function resetStore() {
    user.value = {}
    isUserAlreadyFetched.value = false
  }

  return {
    user,
    addUser,
    isUserAlreadyFetched,
    resetStore,
    likedQuotes,
    notifications,
    isNotificationsAlreadyFetched,
    isNotificationsSeen,
    unreadNotificationsCount,
    quoteFromNotification
  }
})
