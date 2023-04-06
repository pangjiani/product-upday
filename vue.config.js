const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 数据是从 webpack 提供的 node 服务器转发出去，没有经过浏览器，自然不会存在跨域的问题了
  // 根目录下的 vue.config.js 配置转发
  devServer: {
    proxy: "http://localhost:3002"
  },
  // publicPath: process.env.NODE_ENV === 'production'
  //   ? '/product-upday/'
  //   : '/'
})
