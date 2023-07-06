<template>
  <footer>
    <div class="max-h-96 overflow-y-scroll">
      <div v-for="comment in quote.comments" :key="comment.id" class="mt-5 flex text-xl">
        <img
          :src="
            comment.user.profile_picture
              ? apiUrlForPictures + comment.user.profile_picture
              : 'https://www.citypng.com/public/uploads/preview/png-round-blue-contact-user-profile-icon-11639786938sxvzj5ogua.png'
          "
          alt="comment author profile picture"
          class="h-14 w-14 rounded-full mr-6"
        />
        <div class="text-left border-b-2 pb-7 w-full border-default-border-b-color">
          <h2 class="mb-5 pt-5">{{ comment.user.username }}</h2>
          <p>{{ comment.body }}</p>
        </div>
      </div>
    </div>
    <div class="my-7 flex">
      <img
        :src="
          user.profile_picture
            ? apiUrlForPictures + user.profile_picture
            : 'https://www.citypng.com/public/uploads/preview/png-round-blue-contact-user-profile-icon-11639786938sxvzj5ogua.png'
        "
        alt="profile picture"
        class="h-14 rounded-full mr-6"
      />
      <textarea
        class="h-14 placeholder:text-gray-300 pl-7 pt-4 bg-dark-blue border-none rounded-xl w-full"
        name="comment"
        placeholder="White a comment"
      ></textarea>
    </div>
  </footer>
</template>

<script setup>
import { useUserStore } from '@/stores/useUserStore'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

defineProps({
  quote: {
    required: true,
    type: Object
  },
  apiUrlForPictures: {
    required: true,
    type: String
  }
})
</script>