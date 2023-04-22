<template>
    <div class="container">
        <!-- 导航菜单 -->
        <!-- default-active：当前激活菜单的index；
            router：是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转
            select：菜单激活回调。index: 选中菜单项的 index 
                 @select="handSelect"-->
        <el-menu :default-active="$route.name" 
                 class="el-menu-vertical"
                 router>
            <el-menu-item v-for="(item, index) in menuItems" :key="index" :index="item.name">
                <i :class="item.icon"></i>
                <span slot="title">{{ item.title }}</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
export default {
    name: 'MenuList',
    computed: {
        menuItems() {
            return this.$router.options.routes.filter(item => {
               return item.meta && item.meta.title
            }).map(route => ({
                    name: route.name,
                    path: route.path,
                    title: route.meta.title,
                    icon: route.meta.icon,
                }))
        }
    }
}
</script>

<style>
.el-menu-vertical {
    height: 100vh;
}
</style>