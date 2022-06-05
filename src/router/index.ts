import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import ReaderHome from '../pages/ReaderHome.vue'
import ArticlePage from '../pages/ArticlePage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    name: 'ReaderHome',
    component: ReaderHome,
    path: '/'
  },
  {
    name: 'ArticlePage',
    component: ArticlePage,
    path: '/article'
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router