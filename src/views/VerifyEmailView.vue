<template>
  <div class="bg-dark-blue h-screen flex items-center justify-center flex-col">
    <icon-loading-spinner />
    <h1 class="text-white mt-2 text-xl">Verifying...</h1>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import IconLoadingSpinner from '@/components/icons/IconLoadingSpinner.vue'
import { useModalStore } from '@/stores/useModalStore'
import { useEmailToBeVerifiedStore } from '@/stores/useEmailToBeVerifiedStore'
import { updateEmail, verifyEmail } from '@/services/api/auth'

const modalStore = useModalStore()
const emailToBeVerifiedStore = useEmailToBeVerifiedStore()

const toggleModalVisibility = (modalName) => {
  modalStore.toggleModalVisibility(modalName)
}

const route = useRoute()
const router = useRouter()

onMounted(() => {
  if (route.query.token) {
    if (route.query.type === 'new') {
      updateEmail(route.query.token)
        .then((response) => {
          if (response.status === 200) {
            router.replace({ name: 'profile' })
            modalStore.toggleModalVisibility('userUpdateModal')

            setTimeout(() => {
              modalStore.toggleModalVisibility('userUpdateModal')
            }, 4000)
          }
        })
        .catch(() => {
          router.replace({ name: '403' })
        })
    } else {
      verifyEmail(route.query.token)
        .then((response) => {
          if (response.status === 200) {
            router.replace({ name: 'landing' })
            toggleModalVisibility('accountIsActivatedModal')
          }
        })
        .catch((error) => {
          if (error.response.status === 410) {
            emailToBeVerifiedStore.email = route.query.email
            router.replace({ name: 'landing' })
            toggleModalVisibility('verificationLinkExpiredModal')
          } else if (error.response.status === 409) {
            router.replace({ name: 'landing' })
            toggleModalVisibility('alreadyVerifiedEmailModal')
          }
        })
    }
  } else {
    router.replace('/')
  }
})
</script>