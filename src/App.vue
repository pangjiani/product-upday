<template>
  <div id="app">
    <ToolPage></ToolPage>
  </div>
</template>

<script>
// import HomePage from './pages/HomePage/index.vue';
import ToolPage from './pages/ToolPage/index.vue';

export default {
  name: 'App',
  components: {
    ToolPage
  }
}
</script>

<style>
#app {
  background: #f5f5fb;
  height: 100vh;
}
body {
  margin: 0;
}
</style>