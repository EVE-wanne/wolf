//* 这个登录模块存储请求后返回的一个token值
//* 登录的请求写在这个vuex里
//* 当我们在页面点击登录的时候我们触发异步的请求，成功后在触发存储的方法，将这个token存储起来

//* 导入登录的接口
import { login } from '@/api/user'
const state = {
  token: null
}
const mutations = {
  settoken (state, layout) {
    state.token = layout
  },
  deltoken (state) {
    state.token = null
  }
}

const actions = {
  //* 定义一个登录的异步函数
  async login (context, value) {
    const res = await login(value)
    console.log(res)
    context.commit('settoken', res.token)
  }
}

//* 将这个vuex模块暴露出去
export default {
  namespaced: true, //* 独立的空间
  state, //* 登录模块的数据
  mutations, //* 登录模块的方法
  actions //* 登录模块的异步函数
}
