<template>
  <div class="login_container">
    <!-- 登录表单 -->
    <div class="form-login">
      <el-form :model="loginForm" :rules="rules" ref="loginref">
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            prefix-icon="el-icon-user-solid"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            prefix-icon="el-icon-view"
          ></el-input>
        </el-form-item>
        <el-form-item class="login-btn">
          <el-button type="primary" @click="login">提交</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// import { login } from '@/api/user'
// import { mapActions } from 'vuex'  //*写法一
export default {
  created () {

  },
  data () {
    return {
      urlpic: '@/assets/pink.jpg',
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      rules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在3到8之间', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在3到8之间', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // ...mapActions(['login/login']),//*写法一
    reset () {
      this.$refs.loginref.resetFields()
    },
    async login () {
      try {
        await this.$refs.loginref.validate()
        // this.$message.success('登录表单校验成功')
        try {
          // const res = await login(this.loginForm)
          // console.log(res)
          await this.$store.dispatch('login/login', this.loginForm) //* 写法二
          // await this['login/login'](this.loginForm)  //* 写法一
          this.$router.push('/home')
          // console.log('111')
        } catch (err) {
          console.log(err)
        }
      } catch (err) {
        this.$message.error('登录表单校验失败')
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.login_container {
  width: 100vw;
  height: 100vh;
  // background-color: #2a4b6a;
  background: url("@/assets/wolf.jpeg") no-repeat center;
  display: flex;
  justify-content: center;
  align-items: center;
  .form-login {
    width: 450px;
    height: 250px;
    background-color: #fff;
    padding: 50px 15px;
    .login-btn {
      text-align: center;
    }
  }
}
</style>
