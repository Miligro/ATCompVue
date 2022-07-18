import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import FormView from '../views/FormView.vue'
import AlbumsView from '../views/AlbumsView.vue'
import AlbumView from '../views/AlbumView.vue'
import PostsView from '../views/PostsView.vue'
import NotFound from '../views/NotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/form',
      name: 'form',
      component: FormView,
    },
    {
      path: '/posts',
      name: 'posts',
      component: PostsView,
    },
    {
      path: '/albums',
      name: 'albums',
      component: AlbumsView,
    },
    {
      path: '/albums/:id',
      name: 'album',
      component: AlbumView,
    },
    {
      path: '/:catchAll(.*)',
      name: 'notFound',
      component: NotFound,
    },
  ],
})

export default router
