<template>
  <div class="header-container">
    <img src="@/assets/logo1.png" alt="" />
    <p>狼的诱惑后台管理系统</p>
    <el-button class="logoutbtn" @click="layout">退出</el-button>
  </div>
</template>

<script>
export default {
  created () { },
  data () {
    return {}
  },
  methods: {
    layout () {
      //* 退出操作，将vuex里存储的token删除
      this.$store.commit('login/deltoken')
      this.$router.push('/login')
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.header-container {
  display: flex;
  align-items: center;
  /deep/.logoutbtn {
    width: 70px;
    height: 40px;
  }
  p {
    flex: 1;
    margin-left: 15px;
    font-size: 22px;
    color: #ff69b4;
  }
  img {
    width: 60px;
    height: 60px;
  }
}
</style>
