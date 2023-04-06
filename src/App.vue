<template>
  <div id="app">
    <MenuList class="menu" v-if="isLogin"></MenuList>
    <div class="content" :style="isLogin ? '' : 'margin-left:0'">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import MenuList from './components/MenuList/index.vue'

export default {
  name: 'App',
  data() {
    return {
      isLogin: false,
    }
  },
  components: {
    MenuList
  }
}
</script>

<style lang="less">
@menuWidth: 300px;
#app {
  .menu {
    position: fixed;
    width: @menuWidth;
    top: 0;
    bottom: 0;
    left: 0;
  }
  .content {
    margin-left: @menuWidth;
  }
}
body {
  background: #f5f5fb;
  margin: 0;
}
</style>
