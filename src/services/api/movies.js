import axios from '@/plugins/axios/axios'

export async function searchMovies(searchText) {
  return axios.get(`/api/movies/search?search=${searchText}`)
}
