import Vue from 'vue'
import App from './App.vue'
import ElementUI from "element-ui"  //引入组件
import "element-ui/lib/theme-chalk/index.css"  //引入样式
import router from './router'

// const AV = require("leancloud-storage");
// AV.init({
//   appId: "I0IwBRAmq1nrqlhZDCqoUNjC-gzGzoHsz",
//   appKey: "Tf6WipcIlLjExzZKGW90l8cf"
// })

Vue.config.productionTip = false
Vue.use(ElementUI);  //全局引入

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
