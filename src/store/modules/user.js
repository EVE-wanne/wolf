import { userlist } from '@/api/user'
const state = {
  userlist: [],
  breadcrumb: {
    one: '',
    first: '',
    two: ''
  }
}
const mutations = {
  setuserlist (state, layout) {
    state.userlist = layout
  },
  deluserlist (state) {
    state.userlist = null
  },
  setbreadcrumb (state, layout) {
    state.breadcrumb = layout
  }
}

const actions = {
  //* 定义一个请求数据的异步函数
  async getuserlist (context, value) {
    const res = await userlist(value)
    // console.log(2222)
    console.log(res)
    context.commit('setuserlist', res)
  }
}

//* 将这个vuex模块暴露出去
export default {
  namespaced: true, //* 独立的空间
  state, //* 登录模块的数据
  mutations, //* 登录模块的方法
  actions //* 登录模块的异步函数
}
