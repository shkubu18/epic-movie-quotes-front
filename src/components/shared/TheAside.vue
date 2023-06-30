<template>
  <aside class="absolute top-32 left-14">
    <section class="flex items-center">
      <img
        class="h-16 rounded-full mr-6"
        :src="
          user.profile_picture
            ? apiUrl + user.profile_picture
            : 'https://www.citypng.com/public/uploads/preview/png-round-blue-contact-user-profile-icon-11639786938sxvzj5ogua.png'
        "
        alt="profile picture"
      />
      <div class="flex flex-col">
        <h2 class="text-white text-2xl">{{ user.username }}</h2>
        <span class="text-gray-400 cursor-pointer">Edit your profile</span>
      </div>
    </section>
    <section class="text-white pl-3.5 mt-10 w-max">
      <div class="flex items-center mb-10 cursor-pointer">
        <icon-news-feed />
        <span class="text-2xl ml-10 pt-0.5">News feed</span>
      </div>
      <div class="flex items-center mb-10 cursor-pointer">
        <icon-list-of-movies />
        <span class="text-2xl ml-10 pt-0.5">List of movies</span>
      </div>
    </section>
  </aside>
</template>
<script setup>
import IconNewsFeed from '@/components/icons/IconNewsFeed.vue'
import IconListOfMovies from '@/components/icons/IconListOfMovies.vue'
import { useUserStore } from '@/stores/useUserStore'
import { storeToRefs } from 'pinia'

defineProps({
  apiUrl: {
    required: true,
    type: String
  }
})

const userStore = useUserStore()
const { user } = storeToRefs(userStore)
</script>