import { createRouter, createWebHistory } from 'vue-router'
import LandingView from '@/views/LandingView.vue'
import VerifyEmailView from '@/views/VerifyEmailView.vue'
import NewsFeedView from '@/views/NewsFeedView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import ForbiddenView from '@/views/ForbiddenView.vue'
import { isAuthenticated, isNotAuthenticated } from '@/router/guard'
import MovieListView from '@/views/MovieListView.vue'
import MovieDetailView from '@/views/MovieDetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingView,
      beforeEnter: isNotAuthenticated
    },
    {
      path: '/verify-email',
      name: 'verify-email',
      component: VerifyEmailView,
      beforeEnter: isNotAuthenticated
    },
    {
      path: '/newsfeed',
      name: 'newsfeed',
      component: NewsFeedView,
      beforeEnter: isAuthenticated
    },
    {
      path: '/my-movies',
      name: 'my-movies',
      component: MovieListView,
      beforeEnter: isAuthenticated
    },
    {
      path: '/my-movies/:id',
      name: 'movie-detail',
      component: MovieDetailView,
      beforeEnter: isAuthenticated
    },
    {
      path: '/:notFound(.*)',
      name: '404',
      component: NotFoundView
    },
    {
      path: '/403',
      name: '403',
      component: ForbiddenView
    }
  ]
})

export default router
