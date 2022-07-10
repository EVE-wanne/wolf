<template>
  <el-container class="container">
    <!-- 这个是顶部的模块 -->
    <el-header>
      <Header></Header>
    </el-header>
    <!-- 主体模块 -->
    <el-container>
      <!-- 左边的菜单导航 -->
      <el-aside width="200px" :class="{ mini: isCollapse }">
        <!-- 侧边导航 -->
        <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
          <el-button @click="change" :class="{ mini: isCollapse }" class="big"
            >|||</el-button
          >
        </el-radio-group>
        <el-menu
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          :collapse="isCollapse"
          :collapse-transition="false"
          background-color="#373d41"
          text-color="#fff"
          active-text-color="red"
          :unique-opened="true"
          :router="true"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-user-solid"></i>
              <span slot="title">用户管理</span>
            </template>
            <el-menu-item index="user">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span slot="title">用户列表</span>
              </template>
            </el-menu-item>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-s-tools"></i>
              <span slot="title">权限管理</span>
            </template>
            <el-menu-item index="2-1">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span slot="title">角色列表</span>
              </template>
            </el-menu-item>
            <el-menu-item index="2-2">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span slot="title">权限列表</span>
              </template>
            </el-menu-item>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-s-goods"></i>
              <span slot="title">商品管理</span>
            </template>
            <el-menu-item index="3-1">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span slot="title">商品列表</span>
              </template>
            </el-menu-item>
            <el-menu-item index="3-2">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span slot="title">分类参数</span>
              </template>
            </el-menu-item>
            <el-menu-item index="3-3">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span slot="title">商品分类</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-s-order"></i>
              <span slot="title">订单管理</span>
            </template>
            <el-menu-item index="4-1">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span slot="title">订单列表</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-s-marketing"></i>
              <span slot="title">数据统计</span>
            </template>
            <el-menu-item index="5-1">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span slot="title">数据报表</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 主体的部分  -->
      <el-main>
        <!-- 二级路由页面 -->
        <router-view> </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Header from '@/views/Home/components/Header.vue'

export default {
  created () { },
  data () {
    return {
      isCollapse: false
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    change () {
      this.isCollapse = !this.isCollapse
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { Header }
}
</script>

<style scoped lang='less'>
.container {
  height: 100vh;
  .el-header {
    background-color: #373d41;
  }
  .el-aside {
    background-color: #373d41;
  }
  .el-main {
    background-color: #eaedf1;
  }
  /deep/.big {
    width: 200px;
  }
  /deep/.mini {
    width: 63px !important;
  }
  .el-button {
    background-color: #ff69b4;
    border: unset;
    border-radius: unset;
    font-size: 16px;
    color: #fff;
  }
  .el-menu {
    border-right: unset;
  }
}
</style>
