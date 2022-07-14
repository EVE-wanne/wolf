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

        <!-- 菜单栏 -->
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
          @select="fn"
        >
          <el-submenu :index="item.path" v-for="item in menus" :key="item.id">
            <template slot="title">
              <i class="el-icon-user-solid"></i>
              <span slot="title">{{ item.authName }}</span>
            </template>
            <el-menu-item
              :index="item.path"
              v-for="item in item.children"
              :key="item.id"
            >
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span slot="title">{{ item.authName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
        <!-- /菜单栏 -->
      </el-aside>
      <!-- 主体的部分  -->
      <el-main>
        <!-- 面包屑 -->
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/home' }" @click.native="go">{{
            breadcrumb.one
          }}</el-breadcrumb-item>
          <el-breadcrumb-item v-if="breadcrumb.first">{{
            breadcrumb.first
          }}</el-breadcrumb-item>
          <el-breadcrumb-item v-if="breadcrumb.two">{{
            breadcrumb.two
          }}</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 二级路由页面 -->
        <router-view> </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Header from '@/views/Home/components/Header.vue'
//* 导入左侧权限列表的接口，我们拿到数据，进行渲染列表
import { getmenus } from '@/api/user'
import { mapGetters } from 'vuex'
export default {
  created () {
    //* 页面打开，我们就要进行请求，那数据
    this.getmenus()
  },
  data () {
    return {
      isCollapse: false,
      menus: []
      // breadcrumb: {
      //   first: '',
      //   two: ''
      // }
      // active: '' //* 当前点中的谁
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    fn (key, keyPath) { //* 这个是点击谁，就能拿到谁的路径
      console.log(key, keyPath)
      // this.breadcrumb.first = 1
      // this.breadcrumb.two = keyPath
      // this.active = keyPath
      const breadcrumb = {
        one: '首页',
        first: '',
        two: ''
      }
      this.menus.forEach(item => {
        if (item.path === keyPath[0]) {
          breadcrumb.first = item.authName
          item.children.forEach(item => {
            if (item.path === keyPath[1]) {
              breadcrumb.two = item.authName
            }
          })
        }
      })

      this.$store.commit('user/setbreadcrumb', breadcrumb)
    },
    change () {
      this.isCollapse = !this.isCollapse
    },
    async getmenus () {
      try {
        const res = await getmenus()
        // console.log(res)
        this.menus = res
      } catch (err) {
        console.log(err)
      }
    },
    go () {
      this.breadcrumb.first = ''
      this.breadcrumb.two = ''
    }
  },
  computed: {
    ...mapGetters(['breadcrumb'])
  },
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
  .el-breadcrumb {
    margin-bottom: 15px;
  }
}
</style>
