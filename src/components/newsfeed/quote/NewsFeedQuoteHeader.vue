<template>
  <header class="text-xl">
    <div class="flex items-center">
      <img
        class="h-14 w-14 rounded-full mr-6 object-cover"
        :src="
          quote.user.profile_picture
            ? apiUrlForPictures + quote.user.profile_picture
            : 'https://www.citypng.com/public/uploads/preview/png-round-blue-contact-user-profile-icon-11639786938sxvzj5ogua.png'
        "
        alt="quote author picture"
      />
      <h2 class="text-white">{{ quote.user.name }}</h2>
    </div>
    <div class="flex items-center mt-4 mb-10">
      <p class="text-left">{{ '“' + quote.name[$i18n.locale] + '.”' }}</p>
      <span>
        {{ $t('texts.movie') + '-' }}
        <span class="text-yellow">{{ quote.movie.name[$i18n.locale] }}</span>
      </span>
      <span class="ml-1.5">{{ '(' + quote.movie.release_date + ')' }}</span>
    </div>
  </header>
</template>

<script setup>
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
