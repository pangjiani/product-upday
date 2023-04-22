import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '../pages/HomePage/index.vue'
import ToolPage from '../pages/ToolPage/index.vue'
import LoginPage from '../pages/LoginPage/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
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
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage
  }
]

const router = new VueRouter({
  routes
})

// 添加路由前置守卫--导航守卫
router.beforeEach((to, from, next) => {
  // 进入其他非登录页面时
  if(to.path !== "/login") {
    // 获取用户登陆之后的token，进行token的判断
    let token = localStorage.getItem('token')
    // 根据是否存在token，判断当前用户是否登陆
    if(token) {
      // 如果登陆了则可以跳转
      next()
    } else {
      // 否则重定向到登陆页
      next('/login')
    }
  }else {
    next()
  }
})

export default router
