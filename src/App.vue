<template>
  <div id="app">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="画廊" name="first"> <HomePage></HomePage> </el-tab-pane>
      <el-tab-pane label="工具导航" name="second"> <ToolPage></ToolPage> </el-tab-pane>
    </el-tabs> 
  </div>
</template>

<script>
import HomePage from './pages/HomePage/index.vue';
import ToolPage from './pages/ToolPage/index.vue';

export default {
  name: 'App',
  components: {
    HomePage,
    ToolPage
  },
  data() {
    return {
      activeName: 'first'
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
}
</script>

<style>
#app {
  background: #f5f5fb;
  height: 100vh;
  padding: 0 10px;
}
body {
  margin: 0;
}
</style>