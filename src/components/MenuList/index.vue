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
    data() {
        return {
            menuItems: [],
        }
    },
    watch: {
        // 监听路由的变化，生成新的菜单栏
        $route: {
            handler() {
                // 获取当前所有可访问的路由，调用方法生成动态菜单
                this.genreateMenus(this.$router.matcher.getRoutes())
            },
            immediate: true
        }
    },
    methods: {
        // 生成动态菜单的方法
        genreateMenus(routes) {
            this.menuItems = routes.filter(item => item.meta && item.meta.title)
                .map(route => ({
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