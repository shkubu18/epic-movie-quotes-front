import { createRouter, createWebHistory } from 'vue-router'
import LandingView from '@/views/LandingView.vue'
import VerifyEmailView from '@/views/VerifyEmailView.vue'
import NewsFeedView from '@/views/NewsFeedView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import ForbiddenView from '@/views/ForbiddenView.vue'
import { shouldAuthenticated, shouldNotAuthenticated } from '@/router/guard'
import MovieListView from '@/views/MovieListView.vue'
import MovieDetailView from '@/views/MovieDetailView.vue'
import UserProfileView from '@/views/UserProfileView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingView,
      beforeEnter: shouldNotAuthenticated
    },
    {
      path: '/verify-email',
      name: 'verify-email',
      component: VerifyEmailView
    },
    {
      path: '/newsfeed',
      name: 'newsfeed',
      component: NewsFeedView,
      beforeEnter: shouldAuthenticated
    },
    {
      path: '/my-movies',
      name: 'my-movies',
      component: MovieListView,
      beforeEnter: shouldAuthenticated
    },
    {
      path: '/my-movies/:id',
      name: 'movie-detail',
      component: MovieDetailView,
      beforeEnter: shouldAuthenticated
    },
    {
      path: '/profile',
      name: 'profile',
      component: UserProfileView,
      beforeEnter: shouldAuthenticated
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
