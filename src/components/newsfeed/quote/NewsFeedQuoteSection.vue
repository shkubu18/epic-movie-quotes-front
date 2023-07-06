<template>
  <section>
    <img
      class="w-890 h-500 rounded-xl object-cover"
      :src="apiUrlForPictures + quote.picture"
      alt="quote picture"
    />
    <div class="text-left mt-6 text-xl flex pb-7 border-b-2 border-default-border-b-color">
      <div class="flex items-center mr-8">
        <span class="mr-4">{{ quote.total_comments }}</span>
        <icon-comment />
      </div>
      <div class="flex items-center">
        <span class="mr-4">{{ quote.total_likes }}</span>
        <icon-like />
      </div>
    </div>
  </section>
</template>
<script setup>
import IconComment from '@/components/icons/IconComment.vue'
import IconLike from '@/components/icons/IconLike.vue'

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