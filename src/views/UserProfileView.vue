<template>
  <email-sent-profile-modal v-if="modals.emailSentProfileModal" />

  <transition
    enter-active-class="duration-500 ease"
    enter-from-class="translate-x-96"
    leave-active-class="opacity-0 duration-700 ease"
  >
    <user-update-modal v-if="modals.userUpdateModal" />
  </transition>

  <teleport to="body">
    <spinner-with-background v-if="spinnerStore.isActive" />
  </teleport>
  <the-header />
  <main class="bg-darker-blue flex justify-center min-h-1650 pb-40">
    <the-aside :api-url-for-pictures="apiUrlForPictures" />
    <section class="text-white w-1/2 pt-9 ml-5 max-w-5xl" id="profile-section">
      <h1 class="text-2xl ml-16">My profile</h1>
      <div
        class="w-full bg-lighter-black mt-28 flex flex-col items-center justify-center pb-36 pt-52 relative"
      >
        <div class="absolute -top-20 flex flex-col text-xl items-center">
          <img
            class="h-44 w-44 rounded-full object-cover"
            :src="
              user.profile_picture
                ? apiUrlForPictures + user.profile_picture
                : 'https://www.citypng.com/public/uploads/preview/png-round-blue-contact-user-profile-icon-11639786938sxvzj5ogua.png'
            "
            alt="profile picture"
          />
          <label class="mt-3 cursor-pointer" for="profile_picture">Upload new photo</label>
          <input
            id="profile_picture"
            type="file"
            class="hidden"
            @change="storeUserProfilePicture"
          />
        </div>
        <form-profile :user="user" />
      </div>
    </section>
  </main>
</template>
<script setup>
import TheAside from '@/components/shared/TheAside.vue'
import TheHeader from '@/components/shared/TheHeader.vue'
import FormProfile from '@/components/forms/FormProfile.vue'
import { useUserStore } from '@/stores/useUserStore'
import { storeToRefs } from 'pinia'
import { watch } from 'vue'
import { useModalStore } from '@/stores/useModalStore'
import { getUser, updateUser } from '@/services/api/users'
import { useSpinnerStore } from '@/stores/useSpinnerStore'
import SpinnerWithBackground from '@/components/shared/SpinnerWithBackground.vue'
import EmailSentProfileModal from '@/components/modals/EmailSentProfileModal.vue'
import UserUpdateModal from '@/components/modals/UserUpdateModal.vue'
import { useRouter } from 'vue-router'

const apiUrlForPictures = import.meta.env.VITE_API_BASE_URL + '/storage/'

const router = useRouter()

const userStore = useUserStore()
const { user } = storeToRefs(userStore)
const { isUserAlreadyFetched } = storeToRefs(userStore)

const modalStore = useModalStore()
const { modals } = storeToRefs(modalStore)

const spinnerStore = useSpinnerStore()

watch(isUserAlreadyFetched, async (newValue) => {
  if (!newValue) {
    await getUser()
      .then((response) => {
        userStore.addUser(response.data.user)
      })
      .finally(() => {
        isUserAlreadyFetched.value = true
      })
  }
})

const storeUserProfilePicture = async (event) => {
  const file = event.target.files[0]

  await updateUser({ profile_picture: file }, user.value.id)
    .then((response) => {
      if (response.status === 200) {
        isUserAlreadyFetched.value = false
      }
    })
    .catch(() => {
      router.replace({ name: '403' })
    })
}
</script>