export default function calculateNotificationReceiveTime(time) {
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
    return `${months} month${months > 1 ? 's' : ''} ago`
  } else if (weeks > 0) {
    return `${weeks} week${weeks > 1 ? 's' : ''} ago`
  } else if (days > 0) {
    return `${days} day${days > 1 ? 's' : ''} ago`
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? 's' : ''} ago`
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
  } else if (seconds > 0) {
    return `${seconds} sec${seconds > 1 ? 's' : ''} ago`
  } else {
    return 'now'
  }
}
