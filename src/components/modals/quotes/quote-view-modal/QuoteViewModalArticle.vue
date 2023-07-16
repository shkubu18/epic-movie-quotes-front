<template>
  <article class="text-white bg-black w-940 rounded-xl pb-7 px-7">
    <section class="mb-8">
      <div
        class="flex items-center justify-between border-2 border-crud-input-gray rounded p-2.5 mb-5"
      >
        <p class="italic text-2xl">{{ '"' + quote.name.en + '"' }}</p>
        <span class="text-xl text-crud-input-gray">Eng</span>
      </div>
      <div class="flex items-center justify-between border-2 border-crud-input-gray rounded p-2.5">
        <p class="italic text-2xl">{{ '"' + quote.name.ka + '"' }}</p>
        <span class="text-xl text-crud-input-gray">ქარ</span>
      </div>
    </section>
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
          <icon-like :quote-id="quote.id" />
        </div>
      </div>
    </section>
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
            class="h-14 w-14 rounded-full mr-6 object-cover"
          />
          <div class="text-left border-b-2 pb-7 w-full border-default-border-b-color">
            <h2 class="mb-5 pt-5">{{ comment.user.username }}</h2>
            <p>{{ comment.body }}</p>
          </div>
        </div>
      </div>
      <div class="mt-7 flex">
        <img
          :src="
            user.profile_picture
              ? apiUrlForPictures + user.profile_picture
              : 'https://www.citypng.com/public/uploads/preview/png-round-blue-contact-user-profile-icon-11639786938sxvzj5ogua.png'
          "
          alt="profile picture"
          class="h-14 w-14 rounded-full mr-6 object-cover"
        />
        <textarea
          class="h-14 placeholder:text-gray-300 pl-7 pt-4 bg-dark-blue border-none rounded-xl w-full"
          name="comment"
          :placeholder="$t('quotes.write_comment')"
        ></textarea>
      </div>
    </footer>
  </article>
</template>
<script setup>
import IconLike from '@/components/icons/likes/IconLike.vue'
import IconComment from '@/components/icons/IconComment.vue'

defineProps({
  apiUrlForPictures: {
    required: true,
    type: String
  },
  quote: {
    required: true,
    type: Object
  },
  user: {
    required: true,
    type: Object
  }
})
</script>