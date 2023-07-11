import axios from '@/plugins/axios/axios'

export async function fetchNewsFeedQuotes(page) {
  return axios.get(`/api/quotes?page=${page}`)
}

export async function searchQuotes(searchText) {
  const encodedSearchText = encodeURIComponent(searchText)
  return axios.get(`/api/quotes/search?search=${encodedSearchText}`)
}

export async function addQuote(quoteData) {
  return axios.post('/api/quotes', {
    name_en: quoteData.quote_name_en,
    name_ka: quoteData.quote_name_ka,
    picture: quoteData.picture,
    movie_id: quoteData.movie_id
  })
}

export async function updateQuote(quoteData, quoteId) {
  return axios.post(`/api/quotes/${quoteId}`, {
    name_en: quoteData.quote_name_en,
    name_ka: quoteData.quote_name_ka,
    picture: quoteData.picture,
    movie_id: quoteData.movie_id
  })
}

export async function destroyQuote(quoteId) {
  return axios.delete(`/api/quotes/${quoteId}`)
}

export async function storeComment(body, quoteId) {
  return axios.post('/api/comments', {
    body: body,
    quote_id: quoteId
  })
}

export async function storeLike(quoteId) {
  return axios.post('/api/likes', {
    quote_id: quoteId
  })
}

export async function getLikedQuotes() {
  return axios.get('/api/likes/quotes')
}

export async function getQuote(quoteId) {
  return axios.get(`/api/quotes/${quoteId}`)
}
