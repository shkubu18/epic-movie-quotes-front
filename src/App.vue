<template>
  <RouterView />
</template>

<script setup>
import { useNewsFeedQuoteStore } from '@/stores/useNewsFeedQuoteStore'
import { useUserStore } from '@/stores/useUserStore'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import instantiatePusher from '@/helpers/instantiatePusher'

const newsFeedQuoteStore = useNewsFeedQuoteStore()

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

onMounted(async () => {
  instantiatePusher()

  window.Echo.channel('comments').listen('CommentAdded', (data) => {
    const newComment = {
      id: data.id,
      body: data.body,
      user: {
        username: data.sender.username,
        profile_picture: data.sender.profile_picture
      }
    }

    if (data.sender !== user.value.username) {
      newsFeedQuoteStore.addComment(newComment, data.quote_id)
    }
  })

  window.Echo.channel('likes').listen('Likes\\LikeAdded', (data) => {
    if (data.like.sender !== user.value.username) {
      newsFeedQuoteStore.addLike(data.like.quote_id)
    }
  })

  window.Echo.channel('likes').listen('Likes\\LikeRemoved', (data) => {
    if (data.sender !== user.value.username) {
      newsFeedQuoteStore.removeLike(data.quote_id)
    }
  })
})
</script>