import axios from '@/plugins/axios/axios'

export async function getUserMovies() {
  return axios.get('/api/movies')
}

export async function getMovieGenres() {
  return axios.get('/api/genres')
}

export async function addMovie(movieData) {
  return axios.post('/api/movies', {
    name_en: movieData.movie_name_en,
    name_ka: movieData.movie_name_ka,
    genres: movieData.genres,
    release_date: movieData.release_date,
    director_en: movieData.director_en,
    director_ka: movieData.director_ka,
    description_en: movieData.description_en,
    description_ka: movieData.description_ka,
    picture: movieData.picture
  })
}

export async function updateMovie(movieData, movieId) {
  return axios.post(`/api/movies/${movieId}`, {
    name_en: movieData.movie_name_en,
    name_ka: movieData.movie_name_ka,
    genres: movieData.genres,
    release_date: movieData.release_date,
    director_en: movieData.director_en,
    director_ka: movieData.director_ka,
    description_en: movieData.description_en,
    description_ka: movieData.description_ka,
    picture: movieData.picture
  })
}

export async function getMovie(movieId) {
  return axios.get(`/api/movies/${movieId}`)
}

export async function destroyMovie(movieId) {
  return axios.delete(`/api/movies/${movieId}`)
}
