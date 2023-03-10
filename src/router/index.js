import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '../pages/HomePage/index.vue'
import ToolPage from '../pages/ToolPage/index.vue'


Vue.use(VueRouter)

const routes = [
  {
    // 访问 # 加我们设置的路由地址就是相应的页面，例如http://localhost:8080/#/home
    path: '/home',
    name: 'home',
    component: HomePage
  },
  {
    path: '/tool',
    name: 'tool',
    component: ToolPage
  }
]

const router = new VueRouter({
  routes
})

export default router
