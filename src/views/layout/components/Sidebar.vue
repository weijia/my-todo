<template>
  <div class="sidebar-wrapper">
    <div class="logo">
      <span>My Todo</span>
    </div>
    <el-menu
      :default-active="activeMenu"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
      :collapse-transition="false"
      mode="vertical"
    >
      <sidebar-item
        v-for="route in routes"
        :key="route.path"
        :item="route"
        :base-path="route.path"
      />
    </el-menu>
  </div>
</template>

<script>
import SidebarItem from './SidebarItem'
import { constantRoutes } from '@/router'

export default {
  components: { SidebarItem },
  computed: {
    routes() {
      return constantRoutes
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebar-wrapper {
  .logo {
    height: 50px;
    line-height: 50px;
    text-align: center;
    background-color: #2b3649;
    color: #fff;
    font-size: 18px;
    font-weight: bold;
  }
}
</style>
