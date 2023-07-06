import axios from '@/plugins/axios/axios'

export async function fetchNewsFeedQuotes(page) {
  return axios.get(`/api/quotes?page=${page}`)
}

export async function searchQuotes(searchText) {
  const encodedSearchText = encodeURIComponent(searchText)
  return axios.get(`/api/quotes/search?search=${encodedSearchText}`)
}
