<template>
  <div class="bg-dark-blue h-screen flex items-center justify-center flex-col">
    <icon-loading-spinner />
    <h1 class="text-white mt-2 text-xl">Verifying...</h1>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { verifyEmail } from '@/services/api/auth'
import IconLoadingSpinner from '@/components/icons/IconLoadingSpinner.vue'
import { useModalStore } from '@/stores/useModalStore'
import { useEmailToBeVerifiedStore } from '@/stores/useEmailToBeVerifiedStore'

const modalStore = useModalStore()
const emailToBeVerifiedStore = useEmailToBeVerifiedStore()

const toggleModalVisibility = (modalName) => {
  modalStore.toggleModalVisibility(modalName)
}

const route = useRoute()
const router = useRouter()

onMounted(() => {
  if (route.query.token) {
    verifyEmail(route.query.token)
      .then((response) => {
        if (response.status === 200) {
          router.replace('/')
          toggleModalVisibility('accountIsActivatedModal')
        }
      })
      .catch((error) => {
        if (error.response.status === 410) {
          emailToBeVerifiedStore.email = route.query.email
          router.replace('/')
          toggleModalVisibility('verificationLinkExpiredModal')
        } else if (error.response.status === 409) {
          console.log(route.query)
          router.replace('/')
          toggleModalVisibility('alreadyVerifiedEmailModal')
        }
      })
  } else {
    router.replace('/')
  }
})
</script>