import { useI18n } from 'vue-i18n'

export default function calculateNotificationReceiveTime(time) {
  const { t } = useI18n()

  const createdDate = new Date(time)
  const currentDate = new Date()
  const timeDifference = currentDate.getTime() - createdDate.getTime()
  const seconds = Math.floor(timeDifference / 1000)
  const minutes = Math.floor(timeDifference / (1000 * 60))
  const hours = Math.floor(timeDifference / (1000 * 60 * 60))
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24))
  const weeks = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 7))
  const months = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 30))

  if (months > 0) {
    return `${months} ${t('notifications.month')}`
  } else if (weeks > 0) {
    return `${weeks} ${t('notifications.week')}`
  } else if (days > 0) {
    return `${days} ${t('notifications.day')}`
  } else if (hours > 0) {
    return `${hours} ${t('notifications.hour')}`
  } else if (minutes > 0) {
    return `${minutes} ${t('notifications.minute')}`
  } else if (seconds > 0) {
    return `${seconds} ${t('notifications.second')}`
  } else {
    return 'now'
  }
}
