import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginPage from '../pages/LoginPage/index.vue'

Vue.use(VueRouter)

// 常量路由，每个用户都可以访问
const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginPage
  }
]

// 异步路由，用户需要有对应路由的权限才可以访问
const asyncRoutes = [
  {
    // 访问 # 加我们设置的路由地址就是相应的页面，例如http://localhost:8080/#/home
    path: '/',
    name: '/',
    // 路由懒加载
    component: () => import('../pages/HomePage/index.vue'),
    // 元信息
    meta: {
      title: '画廊',
      icon: 'el-icon-picture-outline'
    }
  },
  {
    path: '/tool',
    name: 'tool',
    component: () => import('../pages/ToolPage/index.vue'),
    meta: {
      title: '工具',
      icon: 'el-icon-suitcase-1'
    }
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('../pages/UserPage/index.vue'),
    meta: {
      title: '用户管理',
      icon: 'el-icon-user',
    }
  }
]

const router = new VueRouter({
  routes
})
// 判断是否已经添加对应权限的路由
let ifAddRoutes = false;
// 添加路由前置守卫--导航守卫
router.beforeEach(async (to, from, next) => {
  // 进入其他非登录页面时
  if(to.path !== "/login") {
    // 获取用户登陆之后的token，进行token的判断
    let token = localStorage.getItem('token')
    // 根据是否存在token，判断当前用户是否登陆
    if(token) {
      if(ifAddRoutes) {
        // 已经添加异步路由
        next()
      } else {
        // 没有添加异步路由
        ifAddRoutes = true
        // 先获取用户路由权限
        let routes = await $get('/api/getRoutes')
        // 计算出需要添加的异步路由
        let addRoutes = asyncRoutes.filter(route => {
          return routes.indexOf(route.name) != -1
        })
        routes.forEach((name) => {
          // find() 方法返回数组中满足提供的测试函数的第一个元素的值,该处返回对象
          let addRoutes = asyncRoutes.find(route => route.name === name)
          // 添加异步路由
          // 新的api router.addRoute 接受的是一个路由规则，也就是一个对象，或者接受一个字符串和一个对象
          router.addRoute(addRoutes)
        })
        
        // 中断当前导航，执行新的导航，会重新进入 router.beforeEach
        // 确保addRoutes已完成,注意要添加 replace: true
        next({...to, replace:true})
      }
    } else {
      // 说明没有登陆，则重定向到登陆页
      next({ name: "login", replace: true })
    }
  }else {
    next()
  }
})

export default router
