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
