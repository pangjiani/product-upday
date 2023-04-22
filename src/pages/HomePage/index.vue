<template>
    <div class="container">
      <el-image v-for="url in urls" :key="url" :src="url" ></el-image>
    </div>
  </template>
  
  <script>
  import { getPicList } from './api'
  export default {
    name: 'HomePage',
    data: function () {
      return {
        urls: []
      }
    },
    async created() {
      // 请求的接口不指定域名：
      const data = await getPicList();
      this.urls = data;
    },
  }
  </script>
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped lang="less">
  .container {
    .img {
    width: 100%;
  }
  }
  </style>