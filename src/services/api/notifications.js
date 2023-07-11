import axios from '@/plugins/axios/axios'

export async function getUserNotifications(page) {
  return axios.get(`/api/notifications?page=${page}`)
}

export async function markNotificationAsRead(notificationId) {
  return axios.post(`/api/notifications/${notificationId}/mark-as-read`)
}

export async function deleteLikeNotification(notificationId) {
  return axios.delete(`/api/notifications/${notificationId}`)
}

export async function markAllNotificationsAsRead() {
  return axios.get('/api/notifications/mark-all-as-read')
}
