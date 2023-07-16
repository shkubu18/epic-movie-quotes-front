<template>
  <section class="flex items-center justify-start my-7 w-full pl-7">
    <img
      class="h-12 w-12 lg:h-16 lg:w-16 rounded-full mr-6 object-cover"
      :src="
        user.profile_picture
          ? apiUrlForPictures + user.profile_picture
          : 'https://www.citypng.com/public/uploads/preview/png-round-blue-contact-user-profile-icon-11639786938sxvzj5ogua.png'
      "
      alt="profile picture"
    />
    <h2 class="text-white text-xl">{{ user.username }}</h2>
  </section>
</template>

<script setup>
defineProps({
  apiUrlForPictures: {
    required: true,
    type: String
  },
  user: {
    required: true,
    type: Object
  }
})
</script>
