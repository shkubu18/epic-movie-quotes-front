<template>
  <aside
    :class="{
      'hidden lg:block absolute top-32 left-14': true,
      'z-30': !isQuoteModalActive,
      'z-0': isQuoteModalActive
    }"
  >
    <router-link :to="{ name: 'profile' }">
      <section class="flex items-center cursor-pointer">
        <img
          :class="{
            'h-16 w-16 rounded-full mr-6 object-cover': true,
            'border-3 border-red': route.path === '/profile'
          }"
          :src="
            user.profile_picture
              ? apiUrlForPictures + user.profile_picture
              : 'https://www.citypng.com/public/uploads/preview/png-round-blue-contact-user-profile-icon-11639786938sxvzj5ogua.png'
          "
          alt="profile picture"
        />
        <div class="flex flex-col">
          <h2 class="text-white text-2xl">{{ user.username }}</h2>
          <span class="text-gray-400 cursor-pointer">{{ $t('profile.edit_your_profile') }}</span>
        </div>
      </section>
    </router-link>
    <section class="text-white pl-3.5 mt-10 w-max">
      <router-link :to="{ name: 'newsfeed' }">
        <div class="flex items-center mb-10 cursor-pointer">
          <icon-news-feed />
          <span class="text-2xl ml-10 pt-0.5">{{ $t('texts.news_feed') }}</span>
        </div>
      </router-link>
      <router-link :to="{ name: 'my-movies' }">
        <div class="flex items-center mb-10 cursor-pointer">
          <icon-list-of-movies />
          <span class="text-2xl ml-10 pt-0.5">{{ $t('texts.list_of_movies') }}</span>
        </div>
      </router-link>
    </section>
  </aside>
</template>
<script setup>
import IconNewsFeed from '@/components/icons/IconNewsFeed.vue'
import IconListOfMovies from '@/components/icons/movies/IconListOfMovies.vue'
import { useUserStore } from '@/stores/useUserStore'
import { storeToRefs } from 'pinia'
import { computed, onMounted, watch } from 'vue'
import { useModalStore } from '@/stores/useModalStore'
import { useRoute } from 'vue-router'
import { getUser } from '@/services/api/users'

defineProps({
  apiUrlForPictures: {
    required: true,
    type: String
  }
})

const route = useRoute()

const userStore = useUserStore()
const { user } = storeToRefs(userStore)
const { isUserAlreadyFetched } = storeToRefs(userStore)
const { notifications } = storeToRefs(userStore)
const { unreadNotificationsCount } = storeToRefs(userStore)

const modalStore = useModalStore()
const { modals } = storeToRefs(modalStore)

const isQuoteModalActive = computed(() => {
  return modals.value.quoteAddModal || modals.value.quoteViewModal || modals.value.quoteEditModal
})

watch(isUserAlreadyFetched, (newValue) => {
  if (newValue) {
    window.Echo.private(`notifications.${user.value.id}`).listen('NotificationAdded', (data) => {
      unreadNotificationsCount.value++
      notifications.value.unshift(data)
    })
  }
})

onMounted(async () => {
  if (!isUserAlreadyFetched.value) {
    await getUser()
      .then((response) => {
        userStore.addUser(response.data.user)
      })
      .finally(() => {
        isUserAlreadyFetched.value = true
      })
  }
})
</script>