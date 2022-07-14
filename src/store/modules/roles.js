const state = {
  tablelist: []
}
const mutations = {
  settablelist (state, layout) {
    state.tablelist = layout
  }
}
const actions = {}
//* 将这个vuex模块暴露出去
export default {
  namespaced: true, //* 独立的空间
  state, //* 登录模块的数据
  mutations, //* 登录模块的方法
  actions //* 登录模块的异步函数
}
