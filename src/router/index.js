// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'HomeView',
        component: () => import('@/views/HomeView.vue'),
      },
      {
        path: '/movie/:id',
        name: 'MovieView',
        component: () => import('@/views/movie/MovieView.vue'),
      },
      {
        path: 'search',
        name: 'SearchView',
        component: () => import('@/views/search/SearchView.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
