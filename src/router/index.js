// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '/',
        name: 'HomeView',
        component: () => import('@/views/HomeView.vue'),
      },
      {
        path: '/card/:id',
        name: 'CardView',
        component: () => import('@/views/card/CardView.vue'),
      },
      {
        path: '/search',
        name: 'SearchView',
        component: () => import('@/views/search/SearchView.vue'),
      },
      {
        path: '/watchlist',
        name: 'WatchListView',
        component : () => import('@/views/watchList/WatchListView.vue')
      },
      {
        path: '/movies',
        name: 'MovieView',
        component : () => import('@/views/movie/MovieView.vue')
      },
      {
        path: '/series',
        name: 'SeriesView',
        component : () => import('@/views/series/SeriesView.vue')
      }
    ],
  },

  {
    path: '/autenticacao',
    component: () => import("@/layouts/default/autenticacao/Autenticacao.vue"),
    children: [
      {
        path: '/login',
        name: 'LoginView',
        component : () => import('@/views/login/LoginView.vue')
      },

      {
        path: '/register',
        name: 'RegisterView',
        component : () => import('@/views/register/RegisterView.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})


export default router
