<template>
  <div id="app">
    <MenuList class="menu" v-if="showMenu"></MenuList>
    <div class="content" :style="showMenu ? '' : 'margin-left:0'">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import MenuList from './components/MenuList/index.vue'

export default {
  name: 'App',
  components: {
    MenuList
  },
  computed: {
    // 计算是否展示菜单，并调整页面布局
    showMenu() {
      return this.$route.path !== "/login"
    }
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
