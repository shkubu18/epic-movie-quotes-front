<template>
  <footer class="relative">
    <div v-if="isLoading" class="absolute h-full w-full flex items-center justify-center bg-black">
      <icon-loading-spinner />
    </div>

    <div ref="commentsSection" id="comments-container" class="max-h-96 overflow-y-scroll">
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
        ref="commentInput"
        class="h-14 placeholder:text-gray-300 outline-none pl-7 pt-4 bg-dark-blue border-none rounded-xl w-full"
        placeholder="White a comment"
        v-model="comment[quote.id]"
        @keydown.enter="addComment(quote.id)"
      ></textarea>
    </div>
  </footer>
</template>

<script setup>
import { useUserStore } from '@/stores/useUserStore'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { storeComment } from '@/services/api/quotes'
import IconLoadingSpinner from '@/components/icons/IconLoadingSpinner.vue'
import { useRouter } from 'vue-router'

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

const router = useRouter()

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const comment = ref({})
const commentInput = ref(null)
const commentsSection = ref(null)

const isLoading = ref(false)

const addComment = async (quoteId) => {
  commentInput.value.blur()

  if (comment.value[quoteId]) {
    isLoading.value = true
    await storeComment(comment.value[quoteId], quoteId)
      .then((response) => {
        if (response.status === 201) {
          comment.value[quoteId] = ''
        }
      })
      .catch(() => {
        router.replace({ name: '403' })
      })
      .finally(() => {
        isLoading.value = false
        commentsSection.value.scrollTo({ top: 0, behavior: 'smooth' })
      })
  }
}
</script>