<template>
  <div class="absolute top-0 left-0 w-11/12 bg-lighter-black h-600 p-10 z-50">
    <aside class="relative">
      <icon-modal-close
        @click="toggleModalVisibility('mobileMenuModal')"
        class="md:hidden absolute -right-3.5 -top-3.5 cursor-pointer"
      />
      <section class="flex items-center cursor-pointer">
        <img
          :class="{
            'h-12 w-12 rounded-full mr-6 object-cover': true,
            'border-3 border-red': route.path === '/profile'
          }"
          :src="
            user.profile_picture
              ? apiUrlForPictures + user.profile_picture
              : 'https://www.citypng.com/public/uploads/preview/png-round-blue-contact-user-profile-icon-11639786938sxvzj5ogua.png'
          "
          alt="profile picture"
        />
        <router-link :to="{ name: 'profile' }" @click="closeModal">
          <div class="flex flex-col">
            <h2 class="text-white text-xl mb-1 lg:mb-0 lg:text-2xl">{{ user.username }}</h2>
            <span class="text-gray-400 cursor-pointer text-xs">
              {{ $t('profile.edit_your_profile') }}
            </span>
          </div>
        </router-link>
      </section>
      <section class="text-white pl-3.5 mt-10 w-max">
        <router-link :to="{ name: 'newsfeed' }" @click="closeModal">
          <div class="flex items-center mb-10 cursor-pointer">
            <icon-news-feed />
            <span class="text-xl lg:text-2xl ml-8 lg:ml-10 pt-0.5">{{
              $t('texts.news_feed')
            }}</span>
          </div>
        </router-link>
        <router-link :to="{ name: 'my-movies' }" @click="closeModal">
          <div class="flex items-center mb-10 cursor-pointer">
            <icon-list-of-movies @click="closeModal" />
            <span class="text-xl lg:text-2xl ml-7 lg:ml-10 pt-0.5">{{
              $t('texts.list_of_movies')
            }}</span>
          </div>
        </router-link>
        <language-switcher class="mb-10" />
        <button-base @click="logoutUser" class="border">{{ $t('auth.logout') }}</button-base>
      </section>
    </aside>
  </div>
</template>
<script setup>
import IconListOfMovies from '@/components/icons/movies/IconListOfMovies.vue'
import IconNewsFeed from '@/components/icons/IconNewsFeed.vue'
import { useUserStore } from '@/stores/useUserStore'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import IconModalClose from '@/components/icons/IconModalClose.vue'
import { useModalStore } from '@/stores/useModalStore'
import LanguageSwitcher from '@/components/shared/LanguageSwitcher.vue'
import ButtonBase from '@/components/ui/ButtonBase.vue'
import { logout } from '@/services/api/auth'
import { useMovieStore } from '@/stores/useMovieStore'
import { useNewsFeedQuoteStore } from '@/stores/useNewsFeedQuoteStore'

const apiUrlForPictures = import.meta.env.VITE_API_BASE_URL + '/storage/'

const route = useRoute()
const router = useRouter()

const movieStore = useMovieStore()
const newsFeedQuoteStore = useNewsFeedQuoteStore()

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const modalStore = useModalStore()

const toggleModalVisibility = (modalName) => {
  modalStore.toggleModalVisibility(modalName)
}

const closeModal = () => {
  setTimeout(() => {
    modalStore.toggleModalVisibility('mobileMenuModal')
  }, 200)
}

const logoutUser = async () => {
  await logout().then((response) => {
    if (response.status === 200) {
      router.replace({ name: 'landing' })

      setTimeout(() => {
        movieStore.resetStore()
        newsFeedQuoteStore.resetStore()
        userStore.resetStore()
      }, 1000)
    }
  })
}
</script>